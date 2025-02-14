
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wifi, Tv, Coffee, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
}

const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe Suite",
    description: "Spacious suite with garden view and private balcony",
    price: 299,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60",
    amenities: ["Free Wi-Fi", "Smart TV", "Coffee Maker", "Room Service"],
  },
  {
    id: 2,
    name: "Executive Room",
    description: "Modern room with city views and work desk",
    price: 199,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=60",
    amenities: ["Free Wi-Fi", "Smart TV", "Coffee Maker"],
  },
  {
    id: 3,
    name: "Family Suite",
    description: "Perfect for families with separate living area",
    price: 399,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&auto=format&fit=crop&q=60",
    amenities: ["Free Wi-Fi", "Smart TV", "Coffee Maker", "Room Service"],
  },
];

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "Free Wi-Fi":
      return <Wifi className="w-4 h-4" />;
    case "Smart TV":
      return <Tv className="w-4 h-4" />;
    case "Coffee Maker":
      return <Coffee className="w-4 h-4" />;
    case "Room Service":
      return <Utensils className="w-4 h-4" />;
    default:
      return null;
  }
};

const Index = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    toast({
      title: "Room Selected",
      description: `You've selected the ${room.name}`,
    });
  };

  const handleContinue = () => {
    if (selectedRoom) {
      navigate("/booking", { state: { room: selectedRoom } });
    } else {
      toast({
        title: "Please select a room",
        description: "You need to select a room before continuing",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-earth-900">Select Your Room</h1>
          <p className="text-lg text-earth-600 max-w-2xl mx-auto">
            Choose from our carefully curated selection of rooms, each designed for your comfort and relaxation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                selectedRoom?.id === room.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleRoomSelect(room)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-earth-900">{room.name}</h3>
                  <p className="text-earth-600">{room.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-1 text-sm bg-sage-50 text-sage-700 px-2 py-1 rounded-full"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4">
                  <p className="text-2xl font-semibold text-earth-900">${room.price}</p>
                  <p className="text-earth-600">per night</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button
            size="lg"
            className="bg-earth-800 hover:bg-earth-900 text-white"
            onClick={handleContinue}
          >
            Continue to Booking
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
