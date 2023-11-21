    import React from "react";
    import { useEffect } from "react";
    import { useState } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
    import InputForm from "../../components/InputForm/InputForm";
    import {
    WrapperContentProfile,
    WrapperHeader,
    WrapperInput,
    WrapperLabel,
    WrapperUploadFile,
    } from "./style";
    import * as UserService from "../../services/UserService";
    import { useMutationHooks } from "../../hooks/useMutationHook";
    import Loading from "../../components/LoadingComponent/Loading";
    import * as message from "../../components/Message/Message";
    import { updateUser } from "../../redux/slides/userSlide";
    import { Button } from "antd";
    import { UploadOutlined } from "@ant-design/icons";
    import { getBase64 } from "../../utils";

    const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    // console.log("user",user)
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");

    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        UserService.updateUser(id, rests, access_token);
    });

    const dispatch = useDispatch();
    const { isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    // const handleGetDetailsUser = async (id, token) => {
    //     const res = await UserService.getDetailsUser(id, token);
    //     dispatch(updateUser({ ...res?.data, access_token: token }));
    //     console.log('res',res)
    // };

    // useEffect(() => {
    //     if (isSuccess) {
    //     message.success("Cập nhật thành công");
    //     // handleGetDetailsUser(user?.id, user?.access_token);
    //     //   dispatch(updateUser({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token }));
    //     } else if (isError) {
    //     message.error();
    //     }
    // }, [isSuccess, isError]);

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnchangeName = (value) => {
        setName(value);
    };
    const handleOnchangePhone = (value) => {
        setPhone(value);
    };
    const handleOnchangeAddress = (value) => {
        setAddress(value);
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

   const handleUpdate = async () => {
    try {
      await mutation.mutate({
        id: user?.id,
        email,
        name,
        phone,
        address,
        avatar,
        access_token: user?.access_token,
      });

      if (mutation.isSuccess) {
        // Dispatch the updateUser action with the updated data
        const updatedUser = {
            ...user,
            email,
            name,
            phone,
            address,
            avatar,
          };
          dispatch(updateUser(updatedUser));

        // Show a success message (if you're using message.success() method)
        message.success("Cập nhật thành công");
      }
    } catch (error) {
      // Handle error (if needed)
      console.error("Error updating user:", error);
    }
  };
  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isLoading={isLoading}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="name"
              value={name}
              onChange={handleOnchangeName}
            />
            
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="email"
              value={email}
              onChange={handleOnchangeEmail}
            />
            
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="email"
              value={phone}
              onChange={handleOnchangePhone}
            />
            
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            {/* <InputForm style={{ width: '300px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
            
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="address"
              value={address}
              onChange={handleOnchangeAddress}
            />
            
          </WrapperInput>
          <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textbutton={"Cập nhật"}
              styleTextButton={{
                color: "rgb(26, 148, 255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
