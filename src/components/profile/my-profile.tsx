import { Box, Typography } from "@mui/material";
import React from "react";
import { CurrentUserResponse } from "../../services/auth";
import avatar from "../../assets/avatar.png";

interface MyProfileProps {
  user: CurrentUserResponse;
}

const MyProfile: React.FC<MyProfileProps> = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        color: "white",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          color="#F74D4D"
          gutterBottom
          marginBottom={5}
          fontWeight={700}
        >
          My Profile
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <img
            src={user.profile_pic || avatar}
            alt={user.name}
            style={{
              width: 450,
              height: 450,
              marginRight: 30,
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <InfoItem label="Name" value={user.name} />
            <InfoItem label="Email" value={user.email} />
            <InfoItem
              label="Phone"
              value={(user.phone as unknown as string) || "0821XXXXXXX"}
            />
            <InfoItem label="Gender" value={user.gender || "Male"} />
            <InfoItem
              label="Address"
              value={
                user.address ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit"
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Box sx={{ marginBottom: 1, display: "flex", flexDirection: "column" }}>
    <Typography color="#F74D4D" component="span">
      {label}
    </Typography>
    <Typography component="span">{value}</Typography>
  </Box>
);

export default MyProfile;
