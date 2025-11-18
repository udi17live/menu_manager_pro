import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import IconOnlyButton from "../buttons/IconOnlyButton";
import { Edit, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import { RestaurantData } from "@/types/types";
import RestaurantEditCreateDialog from "@/components/other/RestaurantEditCreateDialog";
import { toast } from "sonner";
import { deleteRestaurant } from "@/actions/restaurantActions";
import RestaurantDeteleDialog from "../admin/restaurant/RestaurantDeleteDialog";

interface RestaurantCardAdminProps {
  restaurant: RestaurantData;
}

export default function RestaurantCardAdmin({
  restaurant,
}: RestaurantCardAdminProps) {
  return (
    <Card className="flex justify-between rounded shadow-none">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{restaurant?.name}</CardTitle>
        <CardAction className="flex gap-2">
          <RestaurantEditCreateDialog
            trigger={<IconOnlyButton icon={Edit} variant="secondary" />}
            restaurantObj={restaurant}
          />

          <RestaurantDeteleDialog
            id={restaurant.id}
            trigger={
              <IconOnlyButton icon={Trash2} variant="secondary" type="button" />
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col space-y-5">
        <p className="flex gap-2 text-md items-start">
          <MapPin />
          {restaurant?.addressLine1} {restaurant?.addressLine2 ?? ""},
          {restaurant?.city}, {restaurant?.country} {restaurant?.postCode}
        </p>
        {restaurant?.email && (
          <p className="flex gap-2 text-md items-center">
            <Mail />
            {restaurant?.email}
          </p>
        )}
        {restaurant?.phone && (
          <p className="flex gap-2 text-md items-center">
            <Phone />
            {restaurant?.phone}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-400 italic">
          Last updated at:{restaurant?.updatedAt}
        </p>
      </CardFooter>
    </Card>
  );
}
