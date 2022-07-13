import {
  Accommodation,
  AccommodationRoom,
  AccommodationLikes,
  User,
} from "../database/models";
import RoleService from "./roleServices";

const { findRoleById } = RoleService;

class AccommodationService {
  static async createOne(data) {
    const accommodationFacility = await Accommodation.create(data);
    return accommodationFacility;
  }

  static getOne = async (id) => {
    const accommodationFacility = await Accommodation.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "usersLiked",
        },
      ],
    });

    return accommodationFacility;
  };

  static getAll = async () => {
    const accommodationFacilities = await Accommodation.findAll({
      include: [
        {
          model: User,
          as: "usersLiked",
        },
      ],
    });
    return accommodationFacilities;
  };

  static updateOne = async (id, inputData) => {
    const data = await Accommodation.update(
      {
        ...inputData,
      },
      {
        where: { id },
      }
    );
    return data;
  };

  static deleteOne = async (id) => {
    const data = await Accommodation.destroy({ where: { id } });
    return data;
  };

  static likeOrDislike = async (user, accommodationId) => {
    let userRole = await findRoleById(user.dataValues.user_role);

    userRole = JSON.parse(JSON.stringify(userRole));
    if (userRole.roleName !== "requester") {
      console.log(1111, userRole);

      return "notRequester";
    }

    const accommodation = await Accommodation.findOne({
      where: {
        id: accommodationId,
      },
    });

    if (!accommodation) {
      throw new Error("Accommodation not found");
    }

    const isLiked = await AccommodationLikes.findOne({
      where: { accommodationId: accommodationId, userId: user.id },
    });

    if (!isLiked) {
      await AccommodationLikes.create({
        userId: user.id,
        accommodationId: accommodationId,
      });

      return "liked";
    } else {
      await AccommodationLikes.destroy({
        where: {
          accommodationId,
          userId: user.id,
        },
      });

      return "disliked";
    }
  };

  static async createOneRoom(data) {
    const outputData = await AccommodationRoom.create(data);
    return outputData;
  }

  static getOneRoom = async (accommodation_id, id) => {
    const outputData = AccommodationRoom.findOne({
      where: { accommodation_id, id },
    });
    return outputData;
  };

  static getAllRooms = async (accommodation_id) => {
    const outputData = AccommodationRoom.findAll({
      where: { accommodation_id },
    });
    return outputData;
  };

  static updateOneRoom = async (accommodation_id, id, inputData) => {
    const data = await AccommodationRoom.update(
      {
        ...inputData,
      },
      {
        where: { accommodation_id, id },
      }
    );
    return data;
  };

  static deleteOneRoom = async (accommodation_id, id) => {
    const data = await AccommodationRoom.destroy({
      where: { accommodation_id, id },
    });
    return data;
  };

  static deleteAllRooms = async (accommodation_id) => {
    const data = await AccommodationRoom.destroy({
      where: { accommodation_id },
    });
    return data;
  };
}

export default AccommodationService;
