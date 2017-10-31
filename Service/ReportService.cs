using Model.Entities;
using Repository.Contracts;
using Service.Contracts;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
using System;
using System.Security.Cryptography.X509Certificates;
using RestSharp;
using RestSharp.Authenticators;

namespace Service
{
    public class ReportService : IReportService
    {
        private IReportRepository _report;
        private ITokenReportRepository _tokenReport;

        public ReportService(IReportRepository report, ITokenReportRepository tokenReport)
        {
            this._report = report;
            this._tokenReport = tokenReport;
        }

        public async Task<Report> Add(ReportDto model)
        {
            var result = await _report.Add(model);
            return result;
        }

        public async Task<Report> Update(ReportDto model)
        {
            var result = await _report.Update(model);
            return result;
        }

        public async Task<IEnumerable<ReportDto>> GetReports(int userId) {
            var result = await _report.GetReports(userId);
            return result;
        }

        public async Task<ReportDto> Get(int reportId) {
            var result = await _report.Load(reportId);
            return new ReportDto() {
                UserId = result.UserId,
                Name = result.Name,
                Json = result.Json,
                ReportId = result.Id,
                DateCreated = result.DateCreated
            };
        }

        public static async Task SendSimpleMessageAsync(Report report, String mail)
        {
            var uri = new Uri("https://api.mailgun.net/v3");
            RestClient client = new RestClient
            {
                BaseUrl = uri,
                Authenticator =
                new HttpBasicAuthenticator("api", "key-fe4f6680de6e875abd392ea237ba8824")
            };

            RestRequest request = new RestRequest();
            request.AddParameter("domain", "sandbox76e17c68ed47448b8e88b30821388d09.mailgun.org", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", "Mailgun Sandbox <postmaster@sandbox76e17c68ed47448b8e88b30821388d09.mailgun.org>");
            request.AddParameter("to", mail);
            request.AddParameter("subject", "Permisos para visualizar el reporte "+ report.Name );
            request.AddParameter("html","<div style='border: 1px solid #eee;padding: 10px;width: 300px;background: #eee;'><h1 style='margin: 0px;border-bottom: 1px solid #ffffff;'>Reporte "+report.Name+"</h1><br><p>Se ha concedido un día de acceso al reporte, acceda desde este <a href='' style='color: #51afea;'>link</a></p></div>");

            request.Method = Method.POST;
            var result = client.ExecuteAsync(request, null);

        }

        public async Task<bool> SendReport(int reportId, string emails, DateTime dateStart, DateTime dateEnd) {
            try {
                await Task.Run(async () => {                    
                    var report = await _report.Load(reportId);
                    var email_a = emails.Split(';');
                    for(int i = 0; i < email_a.Length; i++) {
                        var tokenReportDto = new TokenReportDto()
                        {
                            DateStart = dateStart,
                            DateEnd = dateEnd,
                            Email = email_a[i],
                            ReportId = reportId,
                        };
                        await _tokenReport.Remove(tokenReportDto.Email, reportId);
                        await _tokenReport.Add(tokenReportDto);
                        await SendSimpleMessageAsync(report,email_a[i]); 
                    }                                  
                });
            return true;
            } catch(Exception e ) {
                return false;
            }
        }

        public async Task<bool> Remove(int reportId, int userId) {
            return await _report.Remove(reportId, userId);
        }  

    }
}
