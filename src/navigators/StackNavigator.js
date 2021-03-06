/* @flow */

import * as React from 'react';
import createNavigationContainer from '../createNavigationContainer';
import createNavigator from './createNavigator';
import CardStackTransitioner from '../views/CardStack/CardStackTransitioner';
import StackRouter from '../routers/StackRouter';
import NavigatorTypes from './NavigatorTypes';

import type {
  NavigationRouteConfigMap,
  StackNavigatorConfig,
  NavigationState,
  NavigationStackScreenOptions,
  NavigationNavigatorProps,
} from '../TypeDefinition';

// A stack navigators props are the intersection between
// the base navigator props (navgiation, screenProps, etc)
// and the view's props
type StackNavigatorProps = NavigationNavigatorProps<
  NavigationStackScreenOptions,
  NavigationState
> &
  React.ElementProps<typeof CardStackTransitioner>;

export default (
  routeConfigMap: NavigationRouteConfigMap,
  stackConfig: StackNavigatorConfig = {}
) => {
  const {
    initialRouteName,
    initialRouteParams,
    paths,
    headerMode,
    mode,
    direction,
    cardStyle,
    transitionConfig,
    onTransitionStart,
    onTransitionEnd,
    navigationOptions,
  } = stackConfig;

  const stackRouterConfig = {
    initialRouteName,
    initialRouteParams,
    paths,
    navigationOptions,
  };

  const router = StackRouter(routeConfigMap, stackRouterConfig);

  // Create a navigator with CardStackTransitioner as the view
  const navigator = createNavigator(
    router,
    routeConfigMap,
    stackConfig,
    NavigatorTypes.STACK
  )((props: StackNavigatorProps) => (
    <CardStackTransitioner
      {...props}
      headerMode={headerMode}
      mode={mode}
      direction={direction}
      cardStyle={cardStyle}
      transitionConfig={transitionConfig}
      onTransitionStart={onTransitionStart}
      onTransitionEnd={onTransitionEnd}
    />
  ));

  return createNavigationContainer(navigator);
};
