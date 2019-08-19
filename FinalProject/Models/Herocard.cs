using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Herocard
    {
        public Herocard()
        {
            Deck = new List<Deck>();
            Comment = new List<Comment>();
        }
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Health { get; set; }
        public double Attack_Power { get; set; }
        public double Defense_Power { get; set; }
        public double Level_Power { get; set; }
        public int Price { get; set; }
        public string Poster { get; set; }
        public bool Active { get; set; }
        public bool Visible { get; set; }

        public virtual ICollection<Deck> Deck { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
    }


}
