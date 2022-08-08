#!/usr/bin/env node

const { Client, Intents, Collection, GuildMember, TextChannel } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
bot.commands = new Collection();
const fs = require('fs')
let config = require('./botconfig.json');
let members = require('./members.json')
let token = config.token;
let prefix = config.prefix;

fs.readdir('./cmds/', (err, files) => {
    if (err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) console.log('No commands!');
    console.log(`Loaded ${jsfiles.length} commands`);
    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        bot.commands.set(props.help.name, props)
        console.log(`${i + 1}.${f} loaded!`)
    })
})

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    let user = message.author.username;
    let userid = message.author.id;
    let messageArray = message.content.split(" ")
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));

    if (cmd) {
        console.log(`command success`);
        cmd.run(bot, message, args);
    }
});

const snapshot = members;

bot.on("interactionCreate", async interaction => {

    if (interaction.isMessageComponent()) {

        if (interaction.customId == 'CHECK_BTN') {

            let invites = await interaction.guild.invites.fetch();
            const exclude = await interaction.guild.roles.fetch('786306700318998548')

            invites = invites.filter(invite => exclude.members.every(m => m.id !== invite.inviterId))

            const groupedInvites = invites.reduce((group, invite) => {
                let inviteData = group.find(o => o.member === invite.inviterId);

                if (!inviteData) {
                    const snapshots = snapshot.find(s => s.member === invite.inviterId)?.invites

                    inviteData = {
                        member: invite.inviterId,
                        invites: !!snapshots ? -snapshots : 0
                    }

                    group.push(inviteData)
                }

                inviteData.invites += invite.uses
                return group;
            }, []);

            groupedInvites.push({
                "member": "433633971562217485",
                "invites": 0
            });

            const leaders = groupedInvites.sort((a, b) => b.invites - a.invites);
            
            const leadersInfos = await Promise.all(
                leaders.slice(0, 3).map(async l => {
                    return {
                        member: await interaction.guild.members.fetch(l.member),
                        invites: l.invites
                    }
                })
            );

            const uses = groupedInvites.find(i => i.member === interaction.member.id)?.invites ?? 0;

            await interaction.reply({
                content: `${uses} people invited\n\n**LEADERS**\n` +
                    `1. <@${leadersInfos[0].member.id}> - ${leadersInfos[0].invites}\n` +
                    `2. <@${leadersInfos[1].member.id}> - ${leadersInfos[1].invites}\n` +
		    `3. <@${leadersInfos[2].member.id}> - ${leadersInfos[2].invites}\n`,
		   // `4. <@${leadersInfos[3].member.id}> - ${leadersInfos[3].invites}\n` +
		   // `5. <@${leadersInfos[4].member.id}> - ${leadersInfos[4].invites}\n`,
                ephemeral: true
            })

            const logChannel = bot.channels.cache.get('1004031345556733952')

            await logChannel.send({
                content: `${uses} people invited by <@${interaction.member.id}>\n\n**LEADERS**\n` +
		    `1. <@${leadersInfos[0].member.id}> - ${leadersInfos[0].invites}\n` +
                    `2. <@${leadersInfos[1].member.id}> - ${leadersInfos[1].invites}\n` +
		    `3. <@${leadersInfos[2].member.id}> - ${leadersInfos[2].invites}\n`
		    // `4. <@${leadersInfos[3].member.id}> - ${leadersInfos[3].invites}\n` +
                    // `5. <@${leadersInfos[4].member.id}> - ${leadersInfos[4].invites}\n`
	    })
        }
    }
});

bot.login(token);
