using PoolWarsV0.MetadataReader;

IHost host = CreateHost(args);
await host.RunAsync();

IHost CreateHost(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(defaults => defaults.UseStartup<Startup>())
        .Build();