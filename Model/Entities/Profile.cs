using System;
using System.Collections.Generic;

namespace Model.Entities
{
    public partial class Profile
    {
        public Profile()
        {
            UserNavigation = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname1 { get; set; }
        public string Surname2 { get; set; }
        public DateTime Birthday { get; set; }
        public string Avatar { get; set; }
        public string FacebookUrl { get; set; }
        public string TwitterUrl { get; set; }
        public int? UserId { get; set; }

        public virtual ICollection<User> UserNavigation { get; set; }
        public virtual User User { get; set; }
    }
}
