import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';

/**
 * @author George Garcia
 * @param { DrawerContentComponentProps } props takes in drawer content props
 * @description ***(ORGANISM)*** The main component to show the side menu 
 */
const SideMenu: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
};

export default SideMenu;