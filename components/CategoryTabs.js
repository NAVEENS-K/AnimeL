
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategoryList from './CategoryList';

const Tab = createMaterialTopTabNavigator();

const CategoryTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All">
        {() => <CategoryList category="All" />}
      </Tab.Screen>
      <Tab.Screen name="Watching">
        {() => <CategoryList category="Watching" />}
      </Tab.Screen>
      <Tab.Screen name="Completed">
        {() => <CategoryList category="Completed" />}
      </Tab.Screen>
      <Tab.Screen name="On Hold">
        {() => <CategoryList category="On Hold" />}
      </Tab.Screen>
      <Tab.Screen name="Dropped">
        {() => <CategoryList category="Dropped" />}
      </Tab.Screen>
      <Tab.Screen name="Plan to Watch">
        {() => <CategoryList category="Plan to Watch" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default CategoryTabs;
