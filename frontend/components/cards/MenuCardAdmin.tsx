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
import { MenuData, RestaurantData } from "@/types/types";
import RestaurantEditCreateDialog from "@/components/other/RestaurantEditCreateDialog";
import { toast } from "sonner";
import { deleteRestaurant } from "@/actions/restaurantActions";
import RestaurantDeteleDialog from "../admin/restaurant/RestaurantDeleteDialog";
import MenuEditCreateDialog from "../other/MenuEditCreateDialog";
import { Switch } from "../ui/switch";

interface MenuCardAdminProps {
  menu: MenuData;
}

export default function MenuCardAdmin({ menu }: MenuCardAdminProps) {
  return (
    <Card className="flex justify-between rounded shadow-none">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{menu?.name}</CardTitle>
        <CardAction className="flex gap-2">
          <MenuEditCreateDialog
            trigger={<IconOnlyButton icon={Edit} variant="secondary" />}
            menuObj={menu}
          />

          {/* <MenuDeteleDialog
            id={menu.id}
            trigger={
              <IconOnlyButton icon={Trash2} variant="secondary" type="button" />
            }
          /> */}
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col space-y-5">
        <p className="flex gap-2 text-md items-start">{menu?.description}</p>
      </CardContent>
      <CardFooter>
        <p className="flex w-full text-sm text-gray-400 italic items-center justify-end">
          <Switch defaultChecked={menu?.isActive} />
        </p>
      </CardFooter>
    </Card>
  );
}
