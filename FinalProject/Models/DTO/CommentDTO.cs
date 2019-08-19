using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models.DTO
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string PosterId { get; set; }
        public string Username { get; set; }
        public int CardId { get; set; }
        public string Message { get; set; }
        public bool isFlagged { get; set; }
        public bool Visible { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

    }
}