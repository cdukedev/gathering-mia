import {
  handleMapDeliveriesDeliveryClick,
  handleMapHelpMenuClick,
  handleMapFilterMenuClick,
  handleDeliveriesDeliveryClick,
} from "./mapPageUtils";

describe("Menu Click Handlers", () => {
  test("handleMapDeliveriesDeliveryClick", () => {
    const handleDeliveryClick = jest.fn();
    const handleMenuClick = jest.fn();
    const clicked = "delivery1";
    const clickedZone = "zone1";

    handleMapDeliveriesDeliveryClick(
      clicked,
      clickedZone,
      handleDeliveryClick,
      handleMenuClick
    );

    expect(handleDeliveryClick).toHaveBeenCalledWith(clicked, clickedZone);
    expect(handleMenuClick).toHaveBeenCalledWith("mapDeliveries");
  });

  test("handleMapHelpMenuClick", () => {
    const handleMenuClick = jest.fn();
    handleMapHelpMenuClick(handleMenuClick);
    expect(handleMenuClick).toHaveBeenCalledWith("mapHelp");
  });

  test("handleMapFilterMenuClick", () => {
    const handleMenuClick = jest.fn();
    handleMapFilterMenuClick(handleMenuClick);
    expect(handleMenuClick).toHaveBeenCalledWith("mapFilter");
  });

  test("handleDeliveriesDeliveryClick", () => {
    const handleDeliveryClick = jest.fn();
    const handleMenuClick = jest.fn();
    const clicked = "delivery2";
    const clickedZone = "zone2";

    handleDeliveriesDeliveryClick(
      clicked,
      clickedZone,
      handleDeliveryClick,
      handleMenuClick
    );

    expect(handleDeliveryClick).toHaveBeenCalledWith(clicked, clickedZone);
    expect(handleMenuClick).toHaveBeenCalledWith("deliveries");
  });
});
