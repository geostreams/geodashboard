import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/customStyles.css';
import {Link} from 'react-router';
import {List, ListItem} from 'react-mdc-web';


class Partners extends Component {

    render() {
        return (
            <div>
                <Menu selected='about'/>
                <div className={styles.custom_page}>

                    <div className={styles.custom_other_header_image}>
                        <div className={styles.custom_about_header_wrapper}>
                            <p id="toc"> </p>
                            <h2 className={styles.custom_about_header}>Partners</h2>
                        </div>
                    </div>
                    <div className={styles.custom_list}>
                        <List>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('usgs').scrollIntoView()}}>
                                    United States Geological Survey (USGS)
                                </Link>
                            </ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('epa').scrollIntoView()}}>
                                    United States Environmental Protection Agency (USEPA)
                                </Link>
                            </ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('wqp').scrollIntoView()}}>
                                    Water Quality Portal (WQP)
                                </Link>
                            </ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('usace').scrollIntoView()}}>
                                    United States Army Corps of Engineers (USACE)
                                </Link>
                            </ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('ngrrec').scrollIntoView()}}>
                                    National Great Rivers Research and Education Center (NGRREC)
                                </Link>
                            </ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('inhs').scrollIntoView()}}>
                                    Illinois Natural History Survey Center (INHS)
                                </Link>
                            </ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('lac').scrollIntoView()}}>
                                    Lewis and Clark Community College (LCC)
                                </Link>
                            </ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('uiuc').scrollIntoView()}}>
                                    University of Illinois at Urbana-Champaign (UIUC)
                                </Link
                                ></ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('seagrant').scrollIntoView()}}>
                                    Illinois-Indiana Sea Grant (IISG)
                                </Link>
                            </ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('ncsa').scrollIntoView()}}>
                                    National Center for Supercomputing Applications (NCSA)
                                </Link>
                            </ListItem>
                            <ListItem className={styles.custom_list_items}>
                                <Link className={styles.custom_links}
                                      onClick={() => {document.getElementById('ilepa').scrollIntoView()}}>
                                    Illinois Environmental Protection Agency
                                </Link>
                            </ListItem>
                        </List>
                    </div>
                    <br/>

                    <div className={styles.custom_paragraph}>
                        <p className={styles.custom_header_second} id="usgs">United States Geological Survey (USGS)</p>
                        <p>The United States Geological Survey (USGS) investigates the occurrence, quantity, quality,
                            distribution, and movement of surface waters and ground waters and disseminates the data to the
                            public, state, and local governments, public and private utilities, and other federal agencies
                            involved with managing our water resources.<br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_third}>NWIS</p>
                        <p className={styles.custom_subparagraph}>As part of the U.S. Geological Survey's (USGS) program for
                            disseminating water data within USGS, to USGS cooperators, and to the general public, the USGS
                            maintains a distributed network of servers for the acquisition, processing, review, and
                            long-term storage of water data. This distributed network of computers is called the
                            National Water Information System (NWIS) and includes water data collected at over 1.5 million
                            sites around the country and at some border and territorial sites.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="epa">United States Environmental Protection Agency
                            (USEPA)</p>
                        <p>The Environmental Protection Agency (USEPA) gathers and distributes water quality monitoring data
                            collected by states, tribes, watershed groups, other federal agencies, volunteer groups, and
                            universities through the Water Quality Exchange (WQX) framework in the STORET Warehouse.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_third}>STORET</p>
                        <p className={styles.custom_subparagraph}>The STORET Data Warehouse is USEPA's repository of the water
                            quality monitoring data collected by water resource management groups across the country. These
                            organizations, including states, tribes, watershed groups, other federal agencies, volunteer
                            groups and universities, submit data to the STORET Warehouse in order to make their data
                            publically accessible. Data can then be re-used for analysis. WQX is the framework by which
                            organizations submit data to the Warehouse.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_third}>WQX</p>
                        <p className={styles.custom_subparagraph}>Groups submit data to the STORET Data Warehouse through a
                            framework called the Water Quality Exchange, or WQX. WQX is not a distributed database that
                            people use, but rather a standard way of sharing data to the STORET Data Warehouse, using the
                            National Environmental Information Exchange Network. The WQX framework consists of
                            different pieces. First, WQX defines a standard set of data elements that must be captured in a
                            data submission file in order for the data to come into the STORET Data Warehouse. Second, WQX
                            uses a standard set of internet protocols that define how a data submission is made to the
                            USEPA. Please go to the WQX page for more information about how WQX works.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_third}>UMESC/LTRM - NGRREC<sup>SM</sup></p>
                        <p className={styles.custom_subparagraph}>UMESC/LTRM - NGRREC affiliates with the Illinois Natural
                            History Survey (INHS) are one of six groups (Lake City, Minnesota; La Crosse, Wisconsin;
                            Bellevue, Iowa; Great Rivers and Havana, Illinois; and Open Rivers and Wetlands, Missouri)
                            nationally collecting fish population and water quality data for the Upper Mississippi
                            Environmental Sciences Center’s (UMESC) Long Term Resource Monitoring Program (LTRM). An
                            element of the Upper Mississippi River Restoration – Environmental Management Program
                            (UMRR-EMP) funded by the U.S. Army Corps of Engineers, LTRM conducts monitoring, focused
                            research projects and evaluates the success of habitat projects on the Upper Mississippi River
                            System. Since beginning in 1986, LTRM has compiled one of the most comprehensive long-term
                            data sets for any major ecosystem in the world.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="wqp">Water Quality Portal (WQP)</p>
                        <p className={styles.custom_paragraph}>The Water Quality Portal (WQP) is a cooperative service
                            sponsored by the United States Geological Survey (USGS), the Environmental Protection Agency
                            (USEPA) and the National Water Quality Monitoring Council (NWQMC) that integrates publicly
                            available water quality data from the USGS National Water Information System (NWIS), the USEPA
                            STOrage and RETrieval (STORET) Data Warehouse, and the USDA ARS Sustaining The Earth’s
                            Watersheds - Agricultural Research Database System (STEWARDS). The WQP serves data collected by
                            over 400 state, federal, tribal, and local agencies. As of February 2014, over 228 million
                            results from over 2.2 million monitoring locations are currently accessible through the portal.
                            The portal reports samples and results collected from each location since the beginning of the
                            databases.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="usace">United States Army Corps of Engineers
                            (USACE)</p>
                        <p className={styles.custom_paragraph}>The U.S. Army Corps of Engineers (USACE) is a dynamic
                            organization with 36,500 civilian and 700 military employees. This diverse workforce
                            provides vital public engineering services in peace and war to strengthen the nation’s security,
                            energize the economy, and reduce risks from disasters. The Corps aims to energize the
                            economy by dredging America’s waterways to support the movement of critical commodities and
                            providing recreation opportunities at our campgrounds, lakes and marinas, as well as reduce
                            disaster risk by devising hurricane and storm damage reduction infrastructure. The Corps
                            is active in protecting and restoring the Nation’s environment including critical efforts in the
                            Everglades, the Louisiana coast, and along many of our nation’s major waterways. The Corps
                            is also responsible for managing a large portion of the nation’s water resources infrastructure
                            including 700 dams, 55,000 acres of shoreline, and 422 lakes in 43 states.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="ngrrec">National Great Rivers Research and Education
                            Center (NGRREC)</p>
                        <p className={styles.custom_paragraph}>National Great Rivers Research and Education Center (NGRREC)
                            was established in 2002 as a partnersship between the Illinois Natural History Survey, the
                            University of Illinois at Urbana-Champaign and Lewis and Clark Community College in Godfrey,
                            IL. Each institution brings unique strengths to the partnership including the Survey’s history
                            and experience with monitoring the state’s rivers, the University of Illinois’ world-class
                            research expertise and Lewis and Clark’s location as a hub in the community at the confluence of
                            the state’s great rivers. The unique partnership has enabled the Center’s rapid growth and
                            contributions to watershed research and education.</p>
                        <p className={styles.custom_paragraph}>
                            Learn more about the <Link href="http://www.ngrrec.org" target="_blank">National Great Rivers Research and Education Center</Link>
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="inhs">Illinois Natural History Survey Center
                            (INHS)</p>
                        <p className={styles.custom_paragraph}>Since 1858, the Illinois Natural History Survey Center (INHS)
                            has been the guardian and recorder of the biological resources of Illinois---the
                            state's biological memory. With a staff of over 200 scientists and technicians, it is recognized
                            as the premier natural history survey in the nation. Over the years, its mission has remained
                            fairly constant: to investigate the diversity, life histories, and ecology of the plants and
                            animals of the state; to publish research results so that those resources can be managed wisely;
                            and to provide information to the public in order to foster an understanding and appreciation of
                            our natural heritage.</p>
                        <p className={styles.custom_paragraph}>
                            Learn more about the <Link href="http://www.inhs.illinois.edu" target="_blank">Illinois Natural History Survey</Link>.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="lac">Lewis and Clark Community College (LCC)</p>
                        <p className={styles.custom_paragraph}>Lewis and Clark Community College (LCC) is a two-year
                            higher education institution with multiple campuses, a river research center, Community
                            Education Centers and training centers located throughout the 220,891-person college
                            district, which reaches into seven counties. Founded in 1970 with 450 students, today Lewis and
                            Clark serves approximately 26,000 students annually.</p>
                        <p className={styles.custom_paragraph}>
                            Learn more about <Link href="http://www.lc.edu" target="_blank">Lewis and Clark Community College</Link>.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="uiuc">University of Illinois at Urbana-Champaign
                            (UIUC)</p>
                        <p className={styles.custom_paragraph}>The University of Illinois at Urbana-Champaign (UIUC) is the
                            state’s flagship public university and a world leader in research, teaching, and public
                            engagement. A land-grant university, Illinois is distinguished by the breadth of its
                            programs, broad academic excellence, and internationally renowned faculty. The University of
                            Illinois serves the state, the nation, and the world by creating knowledge, preparing students
                            for lives of impact, and addressing critical societal needs through the transfer and application
                            of knowledge.</p>
                        <p className={styles.custom_paragraph}>
                            Learn more about the <Link href="http://www.illinois.edu" target="_blank">University of Illinois at Urbana-Champaign</Link>.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="seagrant">Illinois-Indiana Sea Grant (IISG)</p>
                        <p className={styles.custom_paragraph}>Illinois-Indiana Sea Grant (IISG), with its unique
                            mandate to bring the latest science to those who can best use the information, serves a critical
                            role in empowering people to solve problems in sustainable ways. One of more than 30 Sea Grant
                            Programs in the U.S., IISG is focused on the southern Lake Michigan region--104 miles of
                            heavily urbanized and industrialized shoreline in Illinois and Indiana. One third of the
                            population of the Great Lakes lives along the shore of Lake Michigan between Milwaukee,
                            Wisconsin and Michigan City, Indiana. The program is funded through National Oceanic and
                            Atmospheric Administration (NOAA), the University of Illinois and Purdue University, but IISG
                            also works in partnerships with key organizations, institutions, and agencies in the region to
                            reach more audiences and multiply opportunities for success. IISG brings together scientists,
                            educators, policy makers, community decision makers, outreach specialists, business leaders, and
                            the general public to work towards a healthy environment and economy.</p>
                        <p className={styles.custom_paragraph}>
                            Learn more about <Link href="http://www.iisgcp.org/" target="_blank">Illinois-Indiana Sea Grant</Link>.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="ncsa">National Center for Supercomputing Applications
                            (NCSA)</p>
                        <p className={styles.custom_paragraph}>The National Center for Supercomputing Applications (NCSA
                            provides computing, data, networking, and visualization resources and services that help
                            scientists and engineers across the country better understand our world. NCSA is an
                            interdisciplinary hub and is engaged in research and education collaborations with colleagues
                            and students across the campus of the University of Illinois at
                            Urbana-Champaign. Established in 1986 as one of the original sites of the National
                            Science Foundation's Supercomputer Centers Program, NCSA is supported by the state of Illinois,
                            the University of Illinois, the National Science Foundation, and grants from other federal
                            agencies. The center focuses on big computing, big data, and big research.</p>
                        <p className={styles.custom_paragraph}>
                            Learn more about the <Link href="http://www.ncsa.illinois.edu" target="_blank">NCSA</Link>.
                            <br/>
                            <Link className={styles.custom_links}
                                  onClick={() => {document.getElementById('toc').scrollIntoView()}}><sub>[top]</sub>
                            </Link>
                        </p>

                        <p className={styles.custom_header_second} id="ilepa">Illinois Environmental Protection Agency</p>
                        <p className={styles.custom_paragraph}>
                            Learn more about the <Link href="http://www.epa.illinois.gov" target="_blank">Illinois EPA</Link>.
                            <br/>
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

export default Partners;
