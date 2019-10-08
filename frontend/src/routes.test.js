import React from 'react';
import { shallow } from 'enzyme';

import Routes from './routes';
import { Route, MemoryRouter } from 'react-router-dom';
import NewSpot from './pages/New';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

let pathMap = {};
describe('routes using array of routers', () => {
  beforeAll(() => {
    const component = shallow(<Routes/>);
    pathMap = component.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props();
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
      }, {});
  })
  it('should show Login component for / router (getting array of routes)', () => {

    expect(pathMap['/']).toBe(Login);
  })
  it('should show Dashboard component for /dashboard router', () => {
    expect(pathMap['/dashboard']).toBe(Dashboard);
  })
  it('should show New Spot component for /new router', () => {
    expect(pathMap['/new']).toBe(NewSpot);
  })
})