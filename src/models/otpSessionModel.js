import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDb.js";
import Otp from "./otpModel.js";

const OtpSession = sequelize.define("otp_session", {
  challengeId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  otpId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "otps", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: "otp_sessions",
  timestamps: false,
});

OtpSession.belongsTo(Otp, { foreignKey: "otpId", as: "otp" });

export default OtpSession;