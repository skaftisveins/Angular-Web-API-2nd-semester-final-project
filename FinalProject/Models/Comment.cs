using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Comment
    {
        public Comment()
        {
            Created = new DateTime();
            Updated = DateTime.UtcNow;
        }
        [Key]
        public int Id { get; set; }
        [ForeignKey("Poster")]
        public string PosterId { get; set; }
        [ForeignKey("Card")]
        public int CardId { get; set; }
        [Required, MinLength(3, ErrorMessage = "...Minimum letters to post a comment is 3")]
        public string Message { get; set; }

        public bool isFlagged { get; set; }
        public bool Visible { get; set; }
        
        [Column(TypeName = "DateTime2")]
        public DateTime Created { get; set; }

        [Column(TypeName = "DateTime2")]
        public DateTime Updated { get; set; }

        public virtual ApplicationUser Poster { get; set; }
        public virtual Herocard Card { get; set; }
    }
}