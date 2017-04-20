using System;
using System.Collections.Generic;

namespace Model.Entities
{
    public partial class User
    {
        public User()
        {
            Chart = new HashSet<Chart>();
            Profile = new HashSet<Profile>();
            Report = new HashSet<Report>();
        }

        public int Id { get; set; }
        public int? ProfileId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime? DateCreated { get; set; }
        public bool? IsConfirmed { get; set; }
        public bool? Lock { get; set; }
        public int? RolId { get; set; }

        public virtual ICollection<Chart> Chart { get; set; }
        public virtual ICollection<Profile> Profile { get; set; }
        public virtual ICollection<Report> Report { get; set; }
        public virtual Profile ProfileNavigation { get; set; }
        public virtual Rol Rol { get; set; }
    }
}
