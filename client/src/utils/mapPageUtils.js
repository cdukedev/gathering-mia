export const handleMapDeliveriesDeliveryClick = (
  clicked,
  clickedZone,
  handleDeliveryClick,
  handleMenuClick
) => {
  handleDeliveryClick(clicked, clickedZone);
  handleMenuClick("mapDeliveries");
};

export const handleMapHelpMenuClick = (handleMenuClick) => {
  handleMenuClick("mapHelp");
};

export const handleMapFilterMenuClick = (handleMenuClick) => {
  handleMenuClick("mapFilter");
};

export const handleDeliveriesDeliveryClick = (
  clicked,
  clickedZone,
  handleDeliveryClick,
  handleMenuClick
) => {
  handleDeliveryClick(clicked, clickedZone);
  handleMenuClick("deliveries");
};
