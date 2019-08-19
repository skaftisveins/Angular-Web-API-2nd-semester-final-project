using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models.DTO
{
    public class DeckDTO
    {
        public int Id { get; set; }
        public string OwnerId { get; set; }
        public int CardId { get; set; }
        public bool Playable { get; set; }
        public bool Available { get; set; }
    }
}