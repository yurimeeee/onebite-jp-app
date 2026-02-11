import Colors from '@/constants/Colors';
import { Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
import React from 'react';
import { Tabs } from 'expo-router';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
const { width } = Dimensions.get('window');
const TAB_BAR_MARGIN = 20;
const TAB_BAR_WIDTH = width - TAB_BAR_MARGIN * 2;

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          marginHorizontal: TAB_BAR_MARGIN,
          width: TAB_BAR_WIDTH, // 명시적으로 너비 지정
          height: 65,
          borderRadius: 65,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,

          // 그림자 설정 (iOS)
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 10,

          // 그림자 설정 (Android)
          elevation: 5,
        },
        tabBarItemStyle: {
          justifyContent: 'center', // 세로 방향 중앙 정렬
          alignItems: 'center', // 가로 방향 중앙 정렬
          height: '100%', // 부모(tabBarStyle) 높이를 꽉 채움
          // paddingTop: 5, // 미세하게 위쪽 여백을 주고 싶을 때 사용
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 5, // 아이콘 위치 미세 조정
          // marginBottom: 10, // 텍스트를 위로 살짝 올리거나 아래로 내릴 때 조절
        },
        tabBarIconStyle: {
          marginTop: 5, // 아이콘 위치 미세 조정
        },
      }}
    >
      <Tabs.Screen
        name="study"
        options={{
          title: '학습',
          // tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
          tabBarIcon: ({ color }) => <FontAwesome5 name="pen" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: '리스트',
          tabBarIcon: ({ color }) => <Octicons name="list-unordered" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
    </Tabs>
  );
}
