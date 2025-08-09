namespace RealStateAPI.DTO
{
    public class PropertyDTO
    {
        public int? UserId { get; set; }
        public string? Title { get; set; }
        public string? Descritption { get; set; }
        public string? Address { get; set; }
        public int listingType { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int Carspots { get; set; }
        public string? ImageUrl { get; set; }
        public int Price { get; set; }

    }
}
