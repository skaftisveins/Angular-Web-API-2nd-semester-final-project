using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Deck
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Owner")]
        public string OwnerId { get; set; }
        [ForeignKey("Card")]
        public int CardId { get; set; }
        public bool Playable { get; set; }
        public bool Available { get; set; }

        public virtual ApplicationUser Owner { get; set; }
        public virtual Herocard Card { get; set; }
    }
}