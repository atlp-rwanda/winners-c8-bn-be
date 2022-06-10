/*eslint-disable*/
import eventEmitter from "./eventEmitter";
import userServices from "../../services/userService";
import notificationController from "../../controllers/notifications";

const findUserById = async (id) => await userServices.findById(id);
const { notifyUser } = notificationController;
export class Listner {
  static eventListners() {
    eventEmitter.on("userAssignedToManager", async (payload) => {
      const { lineManagerId, id, tokenId } = payload;
      const lineManagerInfo = await findUserById(lineManagerId);
      const userInfo = await findUserById(id);
      if (userInfo) {
        notifyUser(
          {
            receiverId: userInfo.id,
            subject: "Assigned To A Manager: Barefoot App",
            message: `Dear ${userInfo.firstName} ${userInfo.lastName}, 
      
                You have been assigned to ${lineManagerInfo.firstName} ${lineManagerInfo.lastName} as your line manager`,
          },
          userInfo.email
        );
      }
      if (lineManagerId != tokenId) {
        notifyUser(
          {
            receiverId: lineManagerInfo.id,
            subject: "Assigned To A User: Barefoot App",
            message: `Dear ${lineManagerInfo.firstName} ${lineManagerInfo.lastName},

                You have been assigned a new user ${userInfo.firstName} ${userInfo.lastName} `,
          },
          lineManagerInfo.email
        );
      } else {
        notifyUser(
          {
            receiverId: lineManagerInfo.id,
            subject: "Assigned To A User: Barefoot App",
            message: `Dear ${lineManagerInfo.firstName} ${lineManagerInfo.lastName},

                You have assigned yourself a new user ${userInfo.firstName} ${userInfo.lastName} `,
          },
          lineManagerInfo.email
        );
      }
    });
  }

  static eventTripListeners() {
    eventEmitter.on("TripRequest", async (payload) => {
      const { lineManagerId, id } = payload;
      const lineManagerInfo = await findUserById(lineManagerId);
      const userInfo = await findUserById(id);

      if (lineManagerInfo) {
        notifyUser(
          {
            receiverId: lineManagerInfo.id,
            subject: "Trip request: Barefoot App",
            message: `Dear ${lineManagerInfo.firstName} ${lineManagerInfo.lastName},

             New trip request created by  ${userInfo.firstName} ${userInfo.lastName}`,
          },
          lineManagerInfo.email
        );
      }
    });
  }
  static CommentTrip() {
    eventEmitter.on("CommentOnTrip", async (payload) => {
      const { lineManagerId, id } = payload;
      const lineManagerInfo = await findUserById(lineManagerId);
      const userInfo = await findUserById(id);

      if (lineManagerInfo) {
        notifyUser(
          {
            receiverId: lineManagerInfo.id,
            subject: "Comment on travel request: Barefoot App",
            message: `Dear ${lineManagerInfo.firstName} ${lineManagerInfo.lastName},

             New comment on  trip  created by ${userInfo.firstName} ${userInfo.lastName}`,
          },
          lineManagerInfo.email
        );
      }
    });
  }

  static cancelTripListener() {
    eventEmitter.on("CancelTrip", async (payload) => {
      const { lineManagerId, id, tripId } = payload;
      const lineManagerInfo = await findUserById(lineManagerId);
      const userInfo = await findUserById(id);

      if (lineManagerInfo) {
        notifyUser(
          {
            receiverId: lineManagerInfo.id,
            subject: "Cancel travel request: Barefoot App",
            message: `Dear ${lineManagerInfo.firstName} ${lineManagerInfo.lastName},

              Trip ${tripId} which was created by ${userInfo.firstName} ${userInfo.lastName} has been cancelled successfully.`,
          },
          lineManagerInfo.email
        );
      } else {
        notifyUser(
          {
            receiverId: lineManagerInfo.id,
            subject: "Cancel travel request: Barefoot App",
            message: `Dear ${lineManagerInfo.firstName} ${lineManagerInfo.lastName},

               ${userInfo.firstName} ${userInfo.lastName} has been cancelled  his trip request.`,
          },
          lineManagerInfo.email
        );
      }
    });
  }
  static approveListener() {
    eventEmitter.on("ApproveTrip", async (payload) => {
      const { lineManagerId, id, tripId } = payload;
      const lineManagerInfo = await findUserById(lineManagerId);
      const userInfo = await findUserById(id);

      if (lineManagerInfo) {
        notifyUser(
          {
            receiverId: lineManagerInfo.id,
            subject: "Approve  travel request: Barefoot App",
            message: `Dear ${lineManagerInfo.firstName} ${lineManagerInfo.lastName},

             You have successfully approve  trip  ${tripId} which was created by ${userInfo.firstName} ${userInfo.lastName}`,
          },
          lineManagerInfo.email
        );
      }
    });
  }

  static rejectListener() {
    eventEmitter.on("RejectTrip", async (payload) => {
      const { lineManagerId, id, tripId } = payload;
      const lineManagerInfo = await findUserById(lineManagerId);
      const userInfo = await findUserById(id);

      if (lineManagerInfo) {
        notifyUser(
          {
            receiverId: lineManagerInfo.id,
            subject: "Reject travel request: Barefoot App",
            message: `Dear ${lineManagerInfo.firstName} ${lineManagerInfo.lastName},

            The trip request ${tripId} created by ${userInfo.firstName} ${userInfo.lastName} has been rejected.`,
          },
          lineManagerInfo.email
        );
      }
    });
  }

  static editListener() {
    eventEmitter.on("EditTrip", async (payload) => {
      const { lineManagerId, id, tripId } = payload;
      const lineManagerInfo = await findUserById(lineManagerId);
      const userInfo = await findUserById(id);

      if (lineManagerInfo) {
        notifyUser(
          {
            receiverId: lineManagerInfo.id,
            subject: "Update travel request: Barefoot App",
            message: `Dear ${lineManagerInfo.firstName} ${lineManagerInfo.lastName},

             Trip request ${tripId} created by ${userInfo.firstName} ${userInfo.lastName} has Updated successfully`,
          },
          lineManagerInfo.email
        );
      }
    });
  }
}
