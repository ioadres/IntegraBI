using System;
using System.Collections.Generic;

namespace Model.Entities
{
    public partial class Chart
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? DateCreated { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
