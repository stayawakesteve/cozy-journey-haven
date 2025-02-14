
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const availableTimes = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

const Restaurant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");

  if (!location.state?.booking) {
    navigate("/");
    return null;
  }

  const handleBookTable = () => {
    if (!selectedTime) {
      toast({
        title: "Please select a time",
        description: "You need to select a dining time to complete your booking",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Table Reserved!",
      description: `Your table has been reserved for ${selectedTime}`,
    });
    navigate("/");
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
          Back to Booking
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-3xl font-semibold text-earth-900">Reserve Your Table</h1>
              <p className="text-earth-600">
                Complete your stay by booking a table at our restaurant
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg mb-4 block">Select a Time</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      className={`h-12 ${
                        selectedTime === time
                          ? "bg-earth-100 border-earth-300"
                          : ""
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Requests</Label>
                <Textarea
                  id="notes"
                  placeholder="Any dietary requirements or special requests?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-32"
                />
              </div>

              <Button
                onClick={handleBookTable}
                className="w-full bg-earth-800 hover:bg-earth-900 text-white"
              >
                Confirm Reservation
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
