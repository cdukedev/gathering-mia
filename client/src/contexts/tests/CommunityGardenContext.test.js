import React, { useContext } from "react";
import { mount } from "enzyme";
import {
  CommunityGardenContext,
  CommunityGardenProvider,
} from "../CommunityGardenContext";
import Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
Enzyme.configure({ adapter: new Adapter() });

// Create a test component that consumes the context
const TestComponent = () => {
  const context = useContext(CommunityGardenContext);
  return <div>{JSON.stringify(context)}</div>;
};

it("test_community_garden_provider_handles_children_not_provided", () => {
  const wrapper = mount(
    <CommunityGardenProvider>
      <TestComponent />
    </CommunityGardenProvider>
  );
  const testComponent = wrapper.find(TestComponent);
  const contextValue = JSON.parse(testComponent.text());

  expect(contextValue).toHaveProperty("communityGardenToggle");
  expect(contextValue).toHaveProperty("communityGardens");
});

// Tests that the CommunityGardenProvider function handles the case when the communityGardens data is not in the expected format.
it("test_community_garden_provider_handles_community_gardens_not_in_expected_format", () => {
  const invalidData = [
    { lat: 25.7030607, lng: -80.2931365 },
    { lat: 25.724859, lng: -80.3919538 },
    { lat: 25.7280707, lng: -80.3062472 },
  ];

  const wrapper = mount(
    <CommunityGardenProvider communityGardens={invalidData}>
      <TestComponent />
    </CommunityGardenProvider>
  );

  const testComponent = wrapper.find(TestComponent);
  const contextValue = JSON.parse(testComponent.text());

  expect(contextValue).toHaveProperty("communityGardenToggle");
  expect(contextValue).toHaveProperty("communityGardens");
});
