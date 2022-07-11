import models from "../../database/models";
const { AccommodationRoom } = { ...models };
const accommodationRoomSeeder = async () => {
  const accommodationRooms = await AccommodationRoom.bulkCreate([
    {
      id: 1,
      accommodation_id: 1,
      bed_type: "x-large",
      cost: 100,
      images_links: ["https://freesvg.org/img/1538347992.png","https://freesvg.org/img/saladeestar.png","https://freesvg.org/img/Machovka-Plank-bed.png"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      accommodation_id: 1,
      bed_type: "medium",
      cost: 50,
      images_links: ["https://freesvg.org/img/furniture.png","https://freesvg.org/img/1291974833.png"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  return accommodationRooms;
};

export default accommodationRoomSeeder;
