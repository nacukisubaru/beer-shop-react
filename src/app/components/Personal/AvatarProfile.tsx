import { Box } from "@mui/material";
import { FC, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { uploadAvatar } from "../../store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";
import styles from "./styles/profile.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import CustomSnackBar from "../CustomUI/CustomSnackBar/CustomSnackBar";

interface IAvatarProfileProps {
    avatar?: string;
}

const AvatarProfile: FC<IAvatarProfileProps> = ({ avatar = "" }) => {
    const [image, setImage] = useState<string>(avatar);
    const { errorMessage } = useAuthorizationUser();
    const ref = useRef(null);
    const refFile = useRef(null);
    const dispatch = useDispatch();

    const onEnterShowPhotoIcon = () => {
        ref.current.style.display = "block";
    };

    const onLeaveHidePhotoIcon = () => {
        ref.current.style.display = "none";
    };

    const loadAvatar = (e: any) => {
        const formData = new FormData();
        const file = e.target.files[0];
        if (file) {
            //отправлять запрос сохранение файла
            formData.append("image", file);
            dispatch(uploadAvatar(formData));
            const reader = new FileReader();
            reader.onloadend = (e: any) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
            e.target.value = null;
        }
    };

    const handleClickLoad = () => {
        refFile.current.click();
    };

    return (
        <>
            <input
                type="file"
                ref={refFile}
                onChange={loadAvatar}
                style={{ display: "none" }}
            />
            <span ref={ref} style={{ display: "none" }}>
                <FontAwesomeIcon
                    className={styles.addPhotoIcon}
                    icon={faCamera}
                />
            </span>
            <div
                className={styles.avatar}
                onMouseEnter={onEnterShowPhotoIcon}
                onMouseLeave={onLeaveHidePhotoIcon}
                onClick={handleClickLoad}
            >
                {image ? (
                    <Box
                        sx={{
                            background: `url(${image}) center center no-repeat`,
                            height: 80,
                            width: 80,
                            backgroundSize: "contain",
                            borderRadius: "38px",
                        }}
                    ></Box>
                ) : (
                    <AccountCircleIcon
                        className={styles.avatarIcon}
                        style={{
                            fontSize: "5em",
                            color: "#b05326",
                        }}
                    />
                )}
            </div>
            <CustomSnackBar
                severity="error"
                message={errorMessage}
                isOpen={errorMessage ? true : false}
                onClose={()=>{}}
            />
        </>
    );
};

export default AvatarProfile;
