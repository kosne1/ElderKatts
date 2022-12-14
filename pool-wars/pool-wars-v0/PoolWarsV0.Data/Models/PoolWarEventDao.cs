using System.ComponentModel.DataAnnotations;

namespace PoolWarsV0.Data.Models;

public enum PoolWarWinLose
{
    Win,
    Lose
}

public class PoolWarEventDao : UserEvent
{
    public PoolWarWinLose Result { get; set; }

    [Required]
    public string Cards { get; set; } = string.Empty;
}