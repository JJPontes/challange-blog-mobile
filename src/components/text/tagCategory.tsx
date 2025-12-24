import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

interface TagCategoryProps {
  category: string;
  isLeft?: boolean;
}

const TagCategory = ({ category, isLeft = false }: TagCategoryProps) => {
  const { t } = useTranslation();

  const alignmentClass = isLeft ? 'self-start' : 'self-end';

  return (
    <View className={`${alignmentClass} bg-bgGray rounded-md my-4`}>
      <Text
        style={{ textTransform: 'capitalize' }}
        className="text-sm font-bold text-blue-600 px-2 py-1 uppercase"
      >
        {t(`subjects.${category}`)}
      </Text>
    </View>
  );
};

export default TagCategory;
