using System;
using System.Collections.Generic;

namespace Model.Entities
{
    public partial class Report
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? DateCreated { get; set; }
        public string Json { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
