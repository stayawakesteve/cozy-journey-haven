
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;

  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  if (!room) {
    navigate("/");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    toast({
      title: "Booking Confirmed!",
      description: "Your room has been successfully booked.",
    });
    navigate("/restaurant", { state: { room, booking: formData } });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 animate-fade-in">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Room Selection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-earth-900 mb-6">Personal Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <h2 className="text-2xl font-semibold text-earth-900 pt-6 mb-6">Payment Details</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    required
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      required
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      required
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-earth-800 hover:bg-earth-900 text-white mt-8"
                >
                  Complete Booking
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-earth-900 mb-4">Booking Summary</h3>
              <div className="space-y-4">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h4 className="text-lg font-medium text-earth-800">{room.name}</h4>
                <p className="text-earth-600">{room.description}</p>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-earth-600">Price per night</span>
                  <span className="text-xl font-semibold text-earth-900">${room.price}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
