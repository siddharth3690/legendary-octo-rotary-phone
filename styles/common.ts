import colors from "./colors";
import { StyleSheet } from 'react-native';

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const typography = {
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    title: 24,
  },
  fontWeights: {
    regular: '400' as '400',
    bold: '700' as '700',
  },
  fontFamily: {
    regular: 'System',
    bold: 'System',
  },
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.title,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
  },
  text: {
    fontSize: typography.fontSizes.medium,
    color: colors.text,
  },

  subtext: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: typography.fontSizes.medium,
  },
});

export default globalStyles;
