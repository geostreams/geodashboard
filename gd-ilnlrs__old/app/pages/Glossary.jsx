import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/customStyles.css';
import {Link} from 'react-router';
import {List, ListItem} from 'react-mdc-web';


class Glossary extends Component {

    render() {
        return (
            <div>
                <Menu selected='about'/>
                <div className={styles.custom_page}>

                    <div className={styles.custom_other_header_image}>
                        <div className={styles.custom_about_header_wrapper}>
                            <p id="toc"> </p>
                            <h2 className={styles.custom_about_header}>Glossary</h2>
                        </div>
                    </div>
                    <div className={styles.custom_list}>
                        <List>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('contaminants').scrollIntoView()}}>
                                    Contaminants
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('delta').scrollIntoView()}}>
                                    Delta
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('flood').scrollIntoView()}}>
                                    Flood
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('floodRisk').scrollIntoView()}}>
                                    Flood Risk
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('specialFloodHazardAreas').scrollIntoView()}}>
                                    Special Flood Hazard Areas
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('nonSpecialFloodHazardAreas').scrollIntoView()}}>
                                    Non-Special Flood Hazard Areas
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('undeterminedRiskAreas').scrollIntoView()}}>
                                    Undetermined Risk Areas
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('geospatial').scrollIntoView()}}>
                                    Geospatial
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('GREON').scrollIntoView()}}>
                                    GREON<sup>SM</sup>
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('gulfOfMexicoHypoxicZone').scrollIntoView()}}>
                                    Gulf of Mexico Hypoxic Zone
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('HUC').scrollIntoView()}}>
                                    HUC
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('hydrology').scrollIntoView()}}>
                                    Hydrology
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('hypoxia').scrollIntoView()}}>
                                    Hypoxia
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('infrastructure').scrollIntoView()}}>
                                    Infrastructure
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('macroinvertebrates').scrollIntoView()}}>
                                    Macroinvertebrates
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('navigationChannels').scrollIntoView()}}>
                                    Navigation Channels
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('nutrients').scrollIntoView()}}>
                                    Nutrients
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('nutrientPollution').scrollIntoView()}}>
                                    Nutrient Pollution
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('phosphorus').scrollIntoView()}}>
                                    Phosphorus
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('phytoplankton').scrollIntoView()}}>
                                    Phytoplankton
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('reaches').scrollIntoView()}}>
                                    Reaches
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('riverMile').scrollIntoView()}}>
                                    River Mile
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('salinity').scrollIntoView()}}>
                                    Salinity
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('sediment').scrollIntoView()}}>
                                    Sediment
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('stratification').scrollIntoView()}}>
                                    Stratification
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('totalSuspendedSolids').scrollIntoView()}}>
                                    Total Suspended Solids
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('tributary').scrollIntoView()}}>
                                    Tributary
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('wastewater').scrollIntoView()}}>
                                    Wastewater
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('waterQuality').scrollIntoView()}}>
                                    Water Quality
                                </Link>
                            </ListItem>

                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('watershed').scrollIntoView()}}>
                                    Watershed
                                </Link>
                            </ListItem>
                        </List>
                    </div>
                    <br/>

                    <div className={styles.custom_paragraph}>

                        <p className={styles.custom_header_second} id="contaminants">Contaminants</p>
                        <p className={styles.custom_paragraph}>
                            Established by the EPA to protect public health by limiting the levels of contaminants
                            in drinking water, National Primary Drinking Water Regulations (NPDWRs or primary standards)
                            are legally enforceable standards that apply to public water systems. Drinking water,
                            including bottled water, may reasonably be expected to contain at least small amounts of
                            some contaminants. The presence of contaminants does not necessarily indicate that water
                            poses a health risk. EPA sets standards for approximately 90 contaminants and indicators
                            in drinking water.
                            (Source: <Link href="http://water.epa.gov/drink/contaminants/basicinformation/index.cfm" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="delta">Delta</p>
                        <p className={styles.custom_paragraph}>
                            Deltas are wetlands that form as rivers empty their water and sediment into another body of
                            water, such as an ocean, lake, or another river. Deltas can also empty into land, although
                            this is less common. A river moves more slowly as it nears its mouth, or end. This causes
                            sediment, solid material carried downstream by currents, to fall to the river bottom. <br/>
                            The slowing velocity of the river and the build-up of sediment allow the river to break from its
                            single channel as it nears its mouth. Under the right conditions, a river forms a deltaic
                            lobe. A mature deltaic lobe includes a distributary network—a series of smaller, shallower
                            channels, called distributaries, which branch off from the main stem of the river. <br/>
                            In a deltaic lobe, heavier, coarser material settles first. Smaller, finer sediment is carried
                            farther downstream. The finest material is deposited beyond the river's mouth. This material
                            is called alluvium or silt. As silt builds up the delta forms, extending a river's mouth into
                            the body of water into which it is emptying. <br/>
                            A delta is sometimes divided into two parts:
                            subaqueous and subaerial. The subaqueous part of a delta is underwater. This is the most steeply
                            sloping part of the delta, and contains the finest silt. The newest part of the subaqueous delta,
                            furthest from the mouth of the river, is called the prodelta. The subaerial part of a delta is
                            above water. The subaerial region most influenced by waves and tides is called the lower delta.
                            The region most influenced by the river's flow is called the upper delta. <br/>
                            Past decades of river management has prevented the Mississippi River from naturally flowing
                            through its delta wetlands, causing erosion. Between 1990 and 2000, the Mississippi River
                            Delta lost 62 square kilometers (24 square miles) of wetlands per year.
                            (Source: <Link href="http://education.nationalgeographic.com/education/encyclopedia/delta/?ar_a=1" target="_blank">National Geographic</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="flood">Flood</p>
                        <p className={styles.custom_paragraph}>
                            Floods are one of the most common hazards in the United States.  Anywhere it rains, it can flood.
                            A flood is a general and temporary condition where two or more acres of normally dry land or two
                            or more properties are inundated by water or mudflow. However not all floods are alike with some
                            floods developing slowly, while others such as flash floods, develop in just a few minutes and
                            without visible signs of rain. Additionally, floods can be local, impacting a neighborhood or
                            community, or very large, affecting entire river basins and multiple states. <br/>
                            Many conditions can result in a flood: hurricanes, overtopped levees, outdated or clogged drainage
                            systems and rapid accumulation of rainfall.  Overland flooding, the most common type of flooding event
                            typically occurs when waterways such as rivers or streams overflow their banks as a result of
                            rainwater or a possible levee breach and cause flooding in surrounding areas.
                            (Sources: <Link href="https://www.floodsmart.gov/floodsmart/pages/flooding_flood_risks/ffr_overview.jsp" target="_blank">NFIP</Link>,&nbsp;
                            <Link href="http://ready.gov/floods" target="_blank">Ready.gov</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="floodRisk">Flood Risk</p>
                        <p className={styles.custom_paragraph}>
                            Flooding can happen anywhere, but certain areas are especially prone to serious flooding. Flood
                            risk can be informed by history, but risk is also based on a number of factors: rainfall,
                            river-flow and tidal-surge data, topography, flood-control measures, climate change, and
                            changes due to building and development. To help communities understand their risk, flood
                            maps (Flood Insurance Rate Maps, FIRMs) have been created to show the locations of high-risk,
                            moderate-to-low risk and undetermined-risk areas.
                            (Source: <Link href="https://www.floodsmart.gov/floodsmart/pages/flooding_flood_risks/defining_flood_risks.jsp" target="_blank">NFIP</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="specialFloodHazardAreas">Special Flood Hazard Areas</p>
                        <p className={styles.custom_paragraph}>
                            In high-risk areas, there is at least a 1 in 4 chance of flooding during a 30-year mortgage.
                            All home and business owners in these areas with mortgages from federally regulated or insured
                            lenders are required to buy flood insurance. They are shown on the flood maps as zones labeled
                            with the letters A or V.
                            (Source: <Link href="https://www.floodsmart.gov/floodsmart/pages/flooding_flood_risks/defining_flood_risks.jsp" target="_blank">NFIP</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="nonSpecialFloodHazardAreas">Non-Special Flood Hazard Areas</p>
                        <p className={styles.custom_paragraph}>
                            In moderate-to-low risk areas, the risk of being flooded is reduced but not completely removed.
                            These areas submit over 20% of NFIP claims and receive one-third of disaster assistance for
                            flooding. Flood insurance isn't federally required in moderate-to-low areas, but it is recommended
                            for all property owners and renters. They are shown on flood maps as zones labeled with the
                            letters B, C or X (or a shaded X).
                            (Source: <Link href="https://www.floodsmart.gov/floodsmart/pages/flooding_flood_risks/defining_flood_risks.jsp" target="_blank">NFIP</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="undeterminedRiskAreas">Undetermined Risk Areas</p>
                        <p className={styles.custom_paragraph}>
                            No flood-hazard analysis has been conducted in these areas, but a flood risk still exists.
                            Flood insurance rates reflect the uncertainty of the flood risk. These areas are labeled with
                            the letter D on the flood maps.
                            (Source: <Link href="https://www.floodsmart.gov/floodsmart/pages/flooding_flood_risks/defining_flood_risks.jsp" target="_blank">NFIP</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="geospatial">Geospatial</p>
                        <p className={styles.custom_paragraph}>
                            Geospatial is a term used to refer to data derived from or related to the earth’s surface,
                            including both geographic and spatial characteristics.<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="GREON">GREON<sup>SM</sup></p>
                        <p className={styles.custom_paragraph}>
                            The Great Rivers Ecological Observatory Network (GREON<sup>SM</sup>) consists of a series of
                            water quality monitoring platforms on the Mississippi River collecting near real-time, continuous
                            water quality data. Data collected from the network will lead to a greater understanding of water
                            quality and aquatic ecology in the Mississippi River system and the factors the drive and influence
                            Gulf hypoxia. The platforms use state-of-the-art sensor technology mounted on a floating platform
                            for in-stream measurement of a suite of water quality parameters.<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="gulfOfMexicoHypoxicZone">Gulf of Mexico Hypoxic Zone</p>
                        <p className={styles.custom_paragraph}>
                            The hypoxic zone in the northern Gulf of Mexico is an area along the Louisiana-Texas coast,
                            where water near the bottom of the Gulf contains less than 2 parts per million of dissolved
                            oxygen, causing a condition referred to as hypoxia. <br/>
                            Each summer, the size of the hypoxic zone is measured. The size of the zone is an important
                            indicator of how much progress is being made to reduce nutrient inputs into the Gulf of Mexico.
                            Sometimes the size of the zone is influenced by other factors, such as droughts or hurricanes
                            that can reduce the size of the zone, or floods that can increase the size.
                            (Source: <Link href="http://water.epa.gov/type/watersheds/named/msbasin/zone.cfm" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="HUC">HUC</p>
                        <p className={styles.custom_paragraph}>
                            Hydrologic Unit Code (HUC) – Just as a phone is assigned a numeric area code, watersheds are
                            assigned a numeric locator, called a Hydrologic Unit Code (HUC).  A HUC can have anywhere from
                            2 to 12 digits.  The more digits, the smaller the land area of the watershed. <br/>
                            The United States is divided and sub-divided into successively smaller hydrologic units which are
                            classified into four levels: regions, sub-regions, accounting units, and cataloging units. The hydrologic
                            units are arranged or nested within each other, from the largest geographic area (regions) to the
                            smallest geographic area (cataloging units). Each hydrologic unit is identified by a unique
                            hydrologic unit code (HUC) based on the four levels of classification in the hydrologic unit system.
                            (Sources: <Link href="http://arkansaswater.org/index.php?option=com_content&task=view&id=312&Itemid=86" target="_blank">Arkansas Water</Link>,&nbsp;
                            <Link href="http://water.usgs.gov/GIS/huc.html" target="_blank">USGS</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="hydrology">Hydrology</p>
                        <p className={styles.custom_paragraph}>
                            Hydrology is the science that encompasses the occurrence, distribution, movement and
                            properties of the waters of the earth and their relationship with the environment within each
                            phase of the hydrologic cycle. The water cycle, or hydrologic cycle, is a continuous process by
                            which water is purified by evaporation and transported from the earth's surface (including the
                            oceans) to the atmosphere and back to the land and oceans. All of the physical, chemical and
                            biological processes involving water as it travels its various paths in the atmosphere, over and
                            beneath the earth's surface and through growing plants, are of interest to those who study the
                            hydrologic cycle.
                            (Source: <Link href="http://water.usgs.gov/edu/hydrology.html#HDR2" target="_blank">USGS</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="hypoxia">Hypoxia</p>
                        <p className={styles.custom_paragraph}>
                            Hypoxia, meaning low oxygen, occurs when dissolved oxygen levels are too low to support aquatic
                            organisms creating “dead zones.” The causes of hypoxia include excess nutrients in the water
                            column, which facilitate algal blooms and phytoplankton growth. <br/>
                            The phytoplankton soon die and decompose, consuming oxygen in the process, which causes the death of
                            aquatic organisms that cannot escape to areas with higher oxygen levels. Although the Gulf’s waters
                            are rich in oxygen, a process called stratification, caused by the natural layering of fresh water
                            from the river and salt water from the Gulf, prevents the two from mixing and keeps the dead zone
                            in place for months at a time. <br/>
                            Direct effects of hypoxia include fish kills, which deplete valuable fisheries and
                            disrupt ecosystems. The Gulf of Mexico hypoxic zone is located in the northern Gulf of Mexico off
                            the coast of Louisiana and Texas. The zone was first documented in 1972.
                            (Source: <Link href="http://water.epa.gov/type/watersheds/named/msbasin/hypoxia101.cfm" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="infrastructure">Infrastructure</p>
                        <p className={styles.custom_paragraph}>
                            River infrastructure refers to the various levees, locks, dams, flood walls, and other man-made
                            structures used to support and maintain transportation on the Mississippi.  The existing 9-foot
                            Channel Navigation Project was largely constructed in the 1930s and extends down the Upper
                            Mississippi River from Minneapolis-St. Paul to its confluence with the Ohio River and up the
                            Illinois Waterway to the Thomas J. O’Brien Lock in Chicago. It includes 37 Locks and approximately
                            1,200 miles of navigable waterway in Illinois, Iowa, Minnesota, Missouri and Wisconsin.
                            (Source: <Link href="http://www.mvr.usace.army.mil/Portals/48/docs/CC/FactSheets/Miss/Mississippi River Locks and Dams (2012).pdf" target="_blank">USACE</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="macroinvertebrates">Macroinvertebrates</p>
                        <p className={styles.custom_paragraph}>
                            Macroinvertebrates are organisms that are large (macro) enough to be seen with the naked eye and
                            lack a backbone (invertebrate). They inhabit all types of running waters, from fastflowing
                            mountain streams to slowmoving muddy rivers. Examples of aquatic macroinvertebrates include
                            insects in their larval or nymph form, crayfish, clams, snails, and worms (Fig. 4.1). Most live
                            part or most of their life cycle attached to submerged rocks, logs, and vegetation. <br/>
                            Being relatively easy to sample and identify, aquatic macroinvertebrates are good indicators of stream
                            quality because they are affected by the physical, chemical, and biological conditions of the
                            stream. The basic principle behind the study of macroinvertebrates is that some are more
                            sensitive to pollution than others. Therefore, if a stream site is inhabited by organisms
                            that can tolerate pollution and the more pollution sensitive organisms are missing a pollution
                            problem is likely.
                            (Source: <Link href="http://water.epa.gov/type/rsl/monitoring/vms40.cfm" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="navigationChannels">Navigation Channels</p>
                        <p className={styles.custom_paragraph}>
                            The navigation system on the Mississippi River refers to 1,200 miles of a 9-foot navigation
                            channel, 37 lock and dam sites, and thousands of channel training structures, all maintained
                            by the US Army Corps of Engineers. The 1,200 miles of 9-foot channel created by the 37 locks
                            and dams allow waterway traffic to move from one pool to another providing an integral regional,
                            national, and international transportation network.<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="nutrients">Nutrients</p>
                        <p className={styles.custom_paragraph}>
                            Nitrogen and phosphorus are nutrients that are natural parts of aquatic ecosystems.
                            Nitrogen is also the most abundant element in the air we breathe. Nitrogen and phosphorus
                            support the growth of algae and aquatic plants, which provide food and habitat for fish,
                            shellfish and smaller organisms that live in water.  Excess nitrogen and phosphorus (nutrients)
                            are among the most prevalent cause of water quality impairment in the United States.
                            (Source: <Link href="http://www2.epa.gov/nutrientpollution/problem" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="nutrientPollution">Nutrient Pollution</p>
                        <p className={styles.custom_paragraph}>
                            Nutrient pollution is one of America's most widespread, costly and challenging environmental
                            problems, and is caused by excess nitrogen and phosphorus in the air and water. Nitrogen and
                            phosphorus are nutrients that are natural parts of aquatic ecosystems. Nitrogen and phosphorus
                            support the growth of algae and aquatic plants, which provide food and habitat for fish,
                            shellfish and smaller organisms that live in water. But when too much nitrogen and phosphorus
                            enter the environment - usually from a wide range of human activities - the air and water can
                            become polluted. Nutrient pollution in ground water - which millions of people in the United
                            States use as their drinking water source - can be harmful, even at low levels. <br/>
                            Nutrient pollution has impacted many streams, rivers, lakes, bays and coastal waters for the past
                            several decades, resulting in serious environmental and human health issues and negative
                            economic impacts. Too much nitrogen and phosphorus in the water causes excessive algal growth
                            or algal blooms that harm water quality, food resources and habitats, and decrease the oxygen
                            that aquatic life need to survive. Some algal blooms are harmful to humans because they produce
                            elevated toxins and bacterial growth that can make people sick if they come into contact with
                            polluted water, consume tainted fish or shellfish, or drink contaminated water.
                            (Source: <Link href="http://www2.epa.gov/nutrientpollution/problem" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="phosphorus">Phosphorus</p>
                        <p className={styles.custom_paragraph}>
                            Both phosphorus and nitrogen are essential nutrients for the plants and animals that make up
                            the aquatic food web. Since phosphorus is the nutrient in short supply in most fresh waters,
                            even a modest increase in phosphorus can, under the right conditions, set off a whole chain of
                            undesirable events in a stream including accelerated plant growth, algae blooms, low dissolved
                            oxygen, and the death of certain fish, invertebrates, and other aquatic animals. <br/>
                            There are many sources of phosphorus, both natural and human. These include soil and rocks, wastewater
                            treatment plants, runoff from fertilized lawns and cropland, failing septic systems, runoff
                            from animal manure storage areas, disturbed land areas, drained wetlands, water treatment, and
                            commercial cleaning preparations. In a stream system, the phosphorus cycle tends to move
                            phosphorus downstream as the current carries decomposing plant and animal tissue and dissolved
                            phosphorus. It becomes stationary only when it is taken up by plants or is bound to particles that
                            settle to the bottom of pools. <br/>
                            Monitoring phosphorus is challenging because it involves measuring very low concentrations down
                            to 0.01 milligram per liter (mg/L) or even lower. Even such very low concentrations of phosphorus
                            can have a dramatic impact on streams. Less sensitive methods should be used only to identify
                            serious problem areas.
                            (Source: <Link href="http://water.epa.gov/type/rsl/monitoring/vms56.cfm" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="phytoplankton">Phytoplankton</p>
                        <p className={styles.custom_paragraph}>
                            Phytoplankton, also known as microalgae, are similar to terrestrial plants in that they
                            contain chlorophyll and require sunlight in order to live and grow. Most phytoplankton are
                            buoyant and float in the upper part of the ocean, where sunlight penetrates the water.
                            Phytoplankton also require inorganic nutrients such as nitrates, phosphates, and sulfur which
                            they convert into proteins, fats, and carbohydrates. <br/>
                            In a balanced ecosystem, phytoplankton provide food for a wide range of sea creatures including
                            whales, shrimp, snails, and jellyfish. When too many nutrients are available, phytoplankton
                            may grow out of control and form harmful algal blooms.
                            (Source: <Link href="http://oceanservice.noaa.gov/facts/phyto.html" target="_blank">NOAA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="reaches">Reaches</p>
                        <p className={styles.custom_paragraph}>
                            On the Mississippi River, the term reach is used to describe areas of similar geomorphology,
                            vegetation cover, and land use practices.  On the Mississippi River, the term Pool is used to
                            describe the area between navigation dams. For example, Pool 13 is the area upstream of Lock
                            and Dam 13, to Lock and Dam 12.  There are 26 navigation pools in the Upper Mississippi River.
                            (Source: <Link href="http://www.umesc.usgs.gov/rivers/upper_mississippi/reach_1/sel_a_pool_r1.html" target="_blank">USGS</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="riverMile">River Mile</p>
                        <p className={styles.custom_paragraph}>
                            The term river mile is the distance from the mouth of the creek or river to the given location,
                            to the nearest tenth of a mile.  The USACE uses river miles in its navigation charts.
                            (Source: <Link href="http://www.mvr.usace.army.mil/Missions/Navigation/NavigationCharts.aspx" target="_blank">USACE</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="salinity">Salinity</p>
                        <p className={styles.custom_paragraph}>
                            Conductivity measurements, along with temperature, also allow for salinity values to be
                            calculated through algorithms.
                            (Source: <Link href="http://www.ysi.com/parametersdetail.php?Conductivity-7" target="_blank">YSI</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="sediment">Sediment</p>
                        <p className={styles.custom_paragraph}>
                            Sediments are fragmented materials that originate from weathering and erosion of rocks or
                            unconsolidated deposits and are transported by, suspended in, or deposited by water. Many of
                            the sediments in our rivers, lakes, and oceans have been contaminated by pollutants. Many of
                            the contaminants were released years ago while other contaminants enter our water every day.
                            Some contaminants flow directly from industrial and municipal waste dischargers, while others
                            come from polluted runoff in urban and agricultural areas. <br/>
                            Suspended and bedded sediments (SABS) are defined by EPA as particulate organic and inorganic matter
                            that suspend in or are carried by the water, and/or accumulate in a loose, unconsolidated form
                            on the bottom of natural water bodies. This includes the frequently used terms of clean sediment,
                            suspended sediment, total suspended solids, bedload, turbidity, or in common terms, dirt,
                            soils or eroded materials.
                            (Source: <Link href="http://water.epa.gov/polwaste/sediments/" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="stratification">Stratification</p>
                        <p className={styles.custom_paragraph}>
                            Stratification occurs when water masses with different properties form layers that prevent
                            the mixing of oxygen-rich surface water with oxygen-poor water on the bottom of the Gulf.
                            Nutrient-laden freshwater from the Mississippi River flows into the Gulf of Mexico. This
                            freshwater is less dense and remains above the more dense saline Gulf water. In addition
                            to the saline gradient caused where the freshwater and saline water meet, the freshwater is
                            warmer than the deeper ocean water, further contributing to the stratification. Without mixing,
                            oxygen in the bottom water is limited and the hypoxic condition remains.
                            (Source: <Link href="http://water.epa.gov/type/watersheds/named/msbasin/hypoxia101.cfm" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="totalSuspendedSolids">Total Suspended Solids</p>
                        <p className={styles.custom_paragraph}>
                            Total solids are dissolved solids plus suspended and settleable solids in water.
                            In stream water, dissolved solids consist of calcium, chlorides, nitrate, phosphorus, iron,
                            sulfur, and other ions particles that will pass through a filter with pores of around 2 microns
                            (0.002 cm) in size. Suspended solids include silt and clay particles, plankton, algae, fine
                            organic debris, and other particulate matter. These are particles that will not pass through a
                            2-micron filter. Sources of total solids include industrial discharges, sewage, fertilizers,
                            road runoff, and soil erosion. Total solids are measured in milligrams per liter (mg/L). <br/>
                            The concentration of total dissolved solids affects the water balance in the cells of aquatic
                            organisms. Higher concentrations of suspended solids can serve as carriers of toxics, which
                            readily cling to suspended particles. A high concentration of total solids will make drinking
                            water unpalatable and might have an adverse effect on people who are not used to drinking such
                            water. Higher solids decrease the passage of light through water, thereby slowing photosynthesis
                            by aquatic plants. Levels of total solids that are too high or too low can also reduce the
                            efficiency of wastewater treatment plants, as well as the operation of industrial processes
                            that use raw water. <br/>
                            Total solids are important to measure in areas where there are discharges from sewage
                            treatment plants, industrial plants, or extensive crop irrigation. In particular,
                            streams and rivers in arid regions where water is scarce and evaporation is high tend to have
                            higher concentrations of solids and are more readily affected by human introduction of solids
                            from land use activities.
                            (Source: <Link href="http://water.epa.gov/type/rsl/monitoring/vms58.cfm" target="_blank">EPA</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="tributary">Tributary</p>
                        <p className={styles.custom_paragraph}>
                            A tributary is a freshwater stream that feeds into a larger stream or river. The larger, or
                            parent, river is called the mainstem. The point where a tributary meets the mainstem is
                            called the confluence. Tributaries, also called affluents, do not flow directly into the
                            ocean. <br/>
                            Most large rivers are formed from many tributaries. Each tributary drains a different
                            watershed, carrying runoff and snowmelt from that area. Each tributary's watershed makes up
                            the larger watershed of the mainstem.
                            (Source: <Link href="http://education.nationalgeographic.com/education/encyclopedia/tributary/?ar_a=1" target="_blank">National Geographic</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="wastewater">Wastewater</p>
                        <p className={styles.custom_paragraph}>
                            Wastewater is used water. Much of the water used by homes, industries, and businesses must be
                            treated before it is released back to the environment. Wastewater includes substances such as
                            human waste, food scraps, oils, soaps and chemicals. In homes, this includes water from sinks,
                            showers, bathtubs, toilets, washing machines and dishwashers. Businesses and industries also
                            contribute their share of used water that must be cleaned. Wastewater also includes storm
                            runoff. Harmful substances that wash off roads, parking lots, and rooftops can harm our
                            rivers and lakes. <br/>
                            Nature has an amazing ability to cope with small amounts of water wastes
                            and pollution, but it would be overwhelmed if we didn't treat the billions of gallons of
                            wastewater and sewage produced every day before releasing it back to the environment.
                            Treatment plants reduce pollutants in wastewater to a level nature can handle.
                            (Source: <Link href="http://water.usgs.gov/edu/wuww.html" target="_blank">USGS</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="waterQuality">Water Quality</p>
                        <p className={styles.custom_paragraph}>
                            Water quality can be thought of as a measure of the suitability of water for a particular
                            use based on selected physical, chemical, and biological characteristics. Water quality can
                            be thought of as a measure of the suitability of water for a particular use based on selected
                            physical, chemical, and biological characteristics. To determine water quality, scientists
                            first measure and analyze characteristics of the water such as temperature, dissolved mineral
                            content, and number of bacteria. <br/>
                            Selected characteristics are then compared to numeric standards and guidelines to decide if
                            the water is suitable for a particular use. Some aspects of water quality can be determined
                            right in the stream or at the well. These include temperature, acidity (pH), dissolved oxygen,
                            and electrical conductance (an indirect indicator of dissolved minerals in the water).
                            Analyses of individual chemicals generally are done at a laboratory.
                            (Source: <Link href="http://pubs.usgs.gov/fs/fs-027-01/" target="_blank">USGS</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="watershed">Watershed</p>
                        <p className={styles.custom_paragraph}>
                            A watershed is the area of land where all of the water that is under it or drains off of it
                            goes into the same place. Watersheds range from a few acres draining to a neighborhood
                            stream, to hundreds of thousands of square miles draining to a major river, such as the
                            Mississippi. The Mississippi River watershed is the fourth largest in the world, including
                            all or parts of 31 states and 2 Canadian Provinces. The watershed measures approximately
                            1.2 million square miles, covering about 40% of the lower 48 states.
                            (Sources: <Link href="http://water.epa.gov/type/watersheds/whatis.cfm" target="_blank">EPA</Link>,&nbsp;
                            <Link href="http://www.nps.gov/miss/riverfacts.htm" target="_blank">NPS</Link>)<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                    </div>

                    <br/>

                </div>
            </div>
        );
    }

}

export default Glossary;
