import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const COLORS = {
  white: "#E8ECF4",
  primary: "#f8f9f5",
  secondary: "#1E232C",
  light: "#35C2C1",
  third: "#111926",
  gray: "#8391A1",
  error: "#f5022f",
  fourth: "#6A707C",
};

const FONT = {
  regular: "SFProRegular",
  regularItalic: "SFProRegularItalic",
  medium: "SFProMedium",
  mediumItalic: "SFProMediumItalic",
  bold: "SFProBold",
  boldItalic: "SFProBoldItalic",
  light: "SFProLight",
  lightItalic: "SFProLightItalic",
  vintageModern: "VintageModern",
};

const SIZES = {
  xSmall: wp(1.5), // Define xSmall size as 5% of the screen's width
  small: wp(2.5), // Define small size as 7% of the screen's width
  medium: wp(3.5), // Define medium size as 10% of the screen's width
  large: wp(4.5), // Define large size as 13% of the screen's width
  xLarge: wp(5.5), // Define xLarge size as 16% of the screen's width
  xxLarge: wp(6.5), // Define xxLarge size as 21% of the screen's width
  xxxLarge: wp(7.5), // Define xxxLarge size as 28% of the screen's width
};

const SHADOWS = {
  small: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.55,
    shadowRadius: 4.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
