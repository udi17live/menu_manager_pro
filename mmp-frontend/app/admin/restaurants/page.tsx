import { getRestaurantDataAdmin } from "@/actions/restaurantActions";
import CustomButton from "@/components/buttons/CustomButton";
import { Plus } from "lucide-react";
import RestaurantCardAdmin from "@/components/cards/RestaurantCardAdmin";
import RestaurantEditCreateDialog from "@/components/other/RestaurantEditCreateDialog";

export default async function RestaurantsPage() {
  const response = await getRestaurantDataAdmin();

  const restaurantData = response.data;

  console.log(restaurantData);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-wide">My Restaurants</h2>
        </div>
        <div>
          <RestaurantEditCreateDialog
            trigger={
              <CustomButton label="Create new Restaurant" leadingIcon={Plus} />
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {restaurantData.map((restaurant: any, index: int) => (
          <RestaurantCardAdmin restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </>
  );
}
