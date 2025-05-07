using System.ComponentModel.DataAnnotations;

namespace MyShoesAPI.DTOs
{
    public class AddressDto
    {
        public required string Street { get; set; }
        public required string City { get; set; }
        public required string State { get; set; }
        public required string ZipCode { get; set; }
        public required string Country { get; set; }
    }
} 