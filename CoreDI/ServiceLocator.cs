
namespace CoreDI
{
    public static class ServiceLocator
    {
        public static void GetServiceLocatorService<T>(T services)
        {
            Service.Locator.ServiceLocator(services);
            Repository.Locator.ServiceLocator(services);
        }
    }
}
