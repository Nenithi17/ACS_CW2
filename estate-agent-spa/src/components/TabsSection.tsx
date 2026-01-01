import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

/**
 * Props for TabsSection component
 */
interface TabsSectionProps {
  longDescription: string;
  floorPlan: string;
  latitude: number;
  longitude: number;
}

/**
 * TabsSection component
 * Uses react-tabs to display property information in tabs:
 * - Tab 1: Long description
 * - Tab 2: Floor plan image
 * - Tab 3: Google Maps iframe
 */
export const TabsSection = ({
  longDescription,
  floorPlan,
  latitude,
  longitude,
}: TabsSectionProps) => {
  // Generate Google Maps embed URL (using place search without API key requirement)
  // Note: This uses the standard Google Maps embed which works without API key
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&output=embed`;

  return (
    <div className="tabs-section">
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Location</Tab>
        </TabList>

        <TabPanel>
          <div className="tab-content">
            <p className="property-description">{longDescription}</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-content">
            <div className="floor-plan-container">
              <img
                src={floorPlan}
                alt="Floor plan"
                className="floor-plan-image"
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-content">
            <div className="map-container">
              <iframe
                title="Property location"
                src={mapsUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

