// import getMenusForUser from "@/actions/menuActions";

import { getMenusForRestaurant } from "@/actions/restaurantActions";
import CustomButton from "@/components/buttons/CustomButton";
import { LoadingState } from "@/components/other/LoadingState";
import RestaurantEditCreateDialog from "@/components/other/RestaurantEditCreateDialog";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import MenuCardAdmin from "@/components/cards/MenuCardAdmin";
import MenuEditCreateDialog from "@/components/other/MenuEditCreateDialog";

export default async function MenuPage() {
  const resp = await getMenusForRestaurant();
  const restaurantMenuData = resp.data;

  console.log("restaurantMenuData: ", restaurantMenuData);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-wide">My Menu's</h2>
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
      {restaurantMenuData.length !== 0 ? (
        <>
          <Accordion type="multiple">
            {restaurantMenuData.map((restaurant: any, index: number) => (
              <AccordionItem value={restaurant.id} key={restaurant.id}>
                <AccordionTrigger>
                  <div className="flex gap-4 text-xl ">
                    {restaurant.name}
                    <Badge variant="secondary">
                      {restaurant.city}, {restaurant.country}
                    </Badge>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  {restaurant.menus?.length !== 0 ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {restaurant.menus?.map((menu) => {
                        return <MenuCardAdmin menu={menu} key={menu.id} />;
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col w-full justify-center items-center gap-4 h-[200px] bg-secondary rounded p-6">
                      <div className="bg-gray-200 p-4 rounded border-2 border-gray-300 border-dashed">
                        <Plus className="size-5" />
                      </div>
                      <p className="text-sm">
                        Oops. No menu found for this restaurant. Create one?
                      </p>
                      <MenuEditCreateDialog
                        trigger={
                          <CustomButton
                            label="Create new menu"
                            leadingIcon={Plus}
                          />
                        }
                        menuObj={null}
                      />
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      ) : (
        <div className="flex flex-col w-full justify-center items-center gap-4 h-[400px] bg-secondary rounded">
          <div className="bg-gray-200 p-4 rounded border-2 border-gray-300 border-dashed">
            <Plus className="size-10" />
          </div>
          <p className="text-lg">
            Oops. No Restaurants found. You need a restaurant to Add a Menu.
            Create one?
          </p>
          <RestaurantEditCreateDialog
            trigger={
              <CustomButton label="Create new Restaurant" leadingIcon={Plus} />
            }
            restaurantObj={null}
          />
        </div>
      )}

      {/* {restaurantData.length !== 0 ? (
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
      )} */}
    </>
  );
}
