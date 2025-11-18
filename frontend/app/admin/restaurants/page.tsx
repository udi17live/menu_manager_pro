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
            restaurantObj={null}
          />
        </div>
      </div>
      {restaurantData.length !== 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {restaurantData.map((restaurant: any, index: number) => (
            <RestaurantCardAdmin restaurant={restaurant} key={restaurant.id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center gap-4 h-[400px] bg-secondary rounded">
          <div className="bg-gray-200 p-4 rounded border-2 border-gray-300 border-dashed">
            <Plus className="size-10" />
          </div>
          <p className="text-lg">Oops. No Restaurants found. Create one?</p>
          <RestaurantEditCreateDialog
            trigger={
              <CustomButton label="Create new Restaurant" leadingIcon={Plus} />
            }
            restaurantObj={null}
          />
        </div>
      )}
    </>
  );
}
