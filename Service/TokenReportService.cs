using Model.Entities;
using Repository.Contracts;
using Service.Contracts;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
using System;
using System.Globalization;

namespace Service
{
    public class TokenReportService : ITokenReportService
    {
        private ITokenReportRepository _report;

        public TokenReportService(ITokenReportRepository report)
        {
            this._report = report;
        }

        public async Task<TokenReport> Add(TokenReportDto model)
        {
            var result = await _report.Add(model);
            return result;
        }               

        public async Task<bool> Remove(string email, int reportId) {
            return await _report.Remove(email, reportId);
        }
        public async Task<bool> Valid(string email, int reportId, DateTime  dateStart, DateTime dateEnd) {
            return await _report.Valid(email, reportId,dateStart,dateEnd);
        }    
    }
}
