using System;
using System.Collections.Generic;

namespace Model.Entities
{
    public partial class TokenReport
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public int ReportId { get; set; }

        public virtual Report Report { get; set; }
    }
}
