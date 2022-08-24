import styled from "styled-components";
import placeHolderUrl from "../../img/profileplaceholder.png";

const SearchPageProfilePic = ({ size, src }) => {
	const imgSize =
		size === "big" ? "55px" : size === "medium" ? "37px" : "32px";

	return (
		<Picture
			imgSize={imgSize}
			src={src || placeHolderUrl}
			alt={"Profile Picture"}
		/>
	);
};

const Picture = styled.img`
	width: ${(props) => props.imgSize};
	height: ${(props) => props.imgSize};
	border-radius: 50%;
	object-fit: cover;
`;

export default SearchPageProfilePic;
