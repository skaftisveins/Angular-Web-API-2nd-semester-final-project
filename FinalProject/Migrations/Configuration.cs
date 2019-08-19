namespace FinalProject.Migrations
{
    using FinalProject.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            if (!context.Roles.Any(r => r.Name == "admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "admin" };

                manager.Create(role);
            }

            if (!context.Users.Any(u => u.UserName == "skafti@herocard.is"))
            {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "skafti@herocard.is", Email = "skafti@herocard.is", Points = 40 };


                manager.Create(user, "pass123");
                manager.AddToRole(user.Id, "admin");
            }

            if (context.Users.Count() < 5)
            {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);

                var user1 = new ApplicationUser { UserName = "eric@herocard.is", Email = "eric@herocard.is", Points = 40 };
                var user2 = new ApplicationUser { UserName = "stan@herocard.is", Email = "stan@herocard.is", Points = 40 };
                var user3 = new ApplicationUser { UserName = "kyle@herocard.is", Email = "kyle@herocard.is", Points = 40 };

                manager.Create(user1, "pass123");
                manager.Create(user2, "pass123");
                manager.Create(user3, "pass123");
            }

            var u0 = context.Users.SingleOrDefault(x => x.UserName == "skafti@herocard.is");
            var u1 = context.Users.SingleOrDefault(x => x.UserName == "eric@herocard.is");
            var u2 = context.Users.SingleOrDefault(x => x.UserName == "stan@herocard.is");
            var u3 = context.Users.SingleOrDefault(x => x.UserName == "kyle@herocard.is");

            var card01 = new Herocard
            {
                Name = "Basic Attack",
                Description = "Good for attacking",
                Poster = "voRus6F.jpg",
                Health = 100,
                Attack_Power = 40,
                Defense_Power = 20,
                Level_Power = 1,
                Price = 20,
                Active = true,
                Visible = true
            };

            var card02 = new Herocard
            {
                Name = "Basic Defense",
                Description = "Good for defending",
                Poster = "Db90q69.jpg",
                Health = 120,
                Attack_Power = 20,
                Defense_Power = 40,
                Level_Power = 1,
                Price = 20,
                Active = true,
                Visible = true
            };

            var card03 = new Herocard
            {
                Name = "Light Tank",
                Description = "Good for taking damage",
                Poster = "gNW8gEP.jpg",
                Health = 140,
                Attack_Power = 20,
                Defense_Power = 30,
                Level_Power = 2,
                Price = 30,
                Active = true,
                Visible = true
            };

            var card04 = new Herocard
            {
                Name = "Glass cannon",
                Description = "High damage, low defense",
                Poster = "pzHh2fH.jpg",
                Health = 60,
                Attack_Power = 60,
                Defense_Power = 10,
                Level_Power = 2,
                Price = 30,
                Active = true,
                Visible = true
            };

            var card05 = new Herocard
            {
                Name = "Basic Healer",
                Description = "Heal other cards",
                Poster = "qIBX9bZ.jpg",
                Health = 100,
                Attack_Power = 10,
                Defense_Power = 20,
                Level_Power = 1,
                Price = 20,
                Active = true,
                Visible = true
            };

            var card06 = new Herocard
            {
                Name = "Basic Rouge",
                Description = "Stealth, double damage if attacking",
                Poster = "MbVFIao.jpg",
                Health = 80,
                Attack_Power = 20,
                Defense_Power = 20,
                Level_Power = 2,
                Price = 30,
                Active = true,
                Visible = true
            };

            context.Herocard.AddOrUpdate(card01, card02, card03, card04, card05, card06);
            context.SaveChanges();

            var deck01 = new Deck
            {
                OwnerId = u0.Id,
                CardId = card01.Id,
                Playable = false,
                Available = true,
            };

            var deck02 = new Deck
            {
                OwnerId = u0.Id,
                CardId = card02.Id,
                Playable = false,
                Available = true,
            };

            var deck03 = new Deck
            {
                OwnerId = u0.Id,
                CardId = card05.Id,
                Playable = false,
                Available = true,
            };

            context.Deck.AddOrUpdate(deck01, deck02, deck03);
            context.SaveChanges();

            var comment01 = new Comment
            {
                PosterId = u0.Id,
                CardId = card01.Id,
                Message = "First comment in database ...",
                isFlagged = false,
                Visible = true,
                Updated = DateTime.UtcNow,
                Created = DateTime.UtcNow
            };

            var comment02 = new Comment
            {
                PosterId = u0.Id,
                CardId = card01.Id,
                Message = "Flagged comment in database ...",
                isFlagged = true,
                Visible = true,
                Updated = DateTime.UtcNow,
                Created = DateTime.UtcNow
            };

            context.Comment.AddOrUpdate(comment01, comment02);
            context.SaveChanges();
        }
    }
}
