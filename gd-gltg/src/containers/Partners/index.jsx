// @flow
import React from 'react';
import {
    Container,
    Divider,
    List,
    ListItem,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyle = makeStyles({
    header: {
        verticalAlign: 'text-top',
        marginTop: 20
    },
    toc: {
        'margin': 'auto 50px',
        'background': '#E6EFF2',
        '& a': {
            'color': 'blue',
            'color:visited': 'blue'
        }
    },
    subHeader: {
        color: '#C69C6D',
        marginTop: 20
    },
    content: {
        lineHeight: 2,
        letterSpacing: '0.01em',
        fontWeight: 200
    },
    link: {
        'color': 'blue',
        '&:visited': 'blue',
        'fontSize': '0.9rem',
        'textDecoration': 'none'
    }
});

const Partners = () => {
    const classes = useStyle();
    return (
        <Container id="toc">
            <Typography
                className={classes.header}
                variant="h4"
                noWrap
                gutterBottom
            >
                Partners
            </Typography>
            <Divider />
            <List className={classes.toc}>
                <ListItem component="a" href="#usgs">
                    United States Geological Survey (USGS)
                </ListItem>
                <ListItem component="a" href="#epa">
                    United States Environmental Protection Agency (USEPA)
                </ListItem>
                <ListItem component="a" href="#wqp">
                    Water Quality Portal (WQP)
                </ListItem>
                <ListItem component="a" href="#usace">
                    United States Army Corps of Engineers (USACE)
                </ListItem>
                <ListItem component="a" href="#ngrrec">
                    National Great Rivers Research and Education Center (NGRREC)
                </ListItem>
                <ListItem component="a" href="#inhs">
                    Illinois Natural History Survey Center (INHS)
                </ListItem>
                <ListItem component="a" href="#lac">
                    Lewis and Clark Community College (LCC)
                </ListItem>
                <ListItem component="a" href="#uiuc">
                    University of Illinois at Urbana-Champaign (UIUC)
                </ListItem>
                <ListItem component="a" href="#seagrant">
                    Illinois-Indiana Sea Grant (IISG)
                </ListItem>
                <ListItem component="a" href="#ncsa">
                    National Center for Supercomputing Applications (NCSA)
                </ListItem>
                <ListItem component="a" href="#ilepa">
                    Illinois Environmental Protection Agency
                </ListItem>
            </List>
            <Divider />
            <Container id="usgs">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    United States Geological Survey (USGS)
                </Typography>
                <p className={classes.content}>
                    The United States Geological Survey (USGS) investigates the occurrence, quantity, quality,
                    distribution, and movement of surface waters and ground waters and disseminates the data to the
                    public, state, and local governments, public and private utilities, and other federal agencies
                    involved with managing our water resources.
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
                <Container>
                    <Typography
                        className={classes.subHeader}
                        variant="h5"
                        noWrap
                        gutterBottom
                    >
                        NWIS
                    </Typography>
                    <p className={classes.content}>
                        As part of the U.S. Geological Survey&quot;s (USGS) program for
                        disseminating water data within USGS, to USGS cooperators, and to the general public, the USGS
                        maintains a distributed network of servers for the acquisition, processing, review, and
                        long-term storage of water data. This distributed network of computers is called the
                        National Water Information System (NWIS) and includes water data collected at over 1.5 million
                        sites around the country and at some border and territorial sites.
                        <br />
                        <a href="#toc" className={classes.link}>[top]</a>
                    </p>
                </Container>
            </Container>
            <Container id="epa">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    United States Environmental Protection Agency (USEPA)
                </Typography>
                <p className={classes.content}>
                    The Environmental Protection Agency (USEPA) gathers and distributes water quality monitoring data
                    collected by states, tribes, watershed groups, other federal agencies, volunteer groups, and
                    universities through the Water Quality Exchange (WQX) framework in the STORET Warehouse.
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
                <Container>
                    <Typography
                        className={classes.subHeader}
                        variant="h5"
                        noWrap
                        gutterBottom
                    >
                        STORET
                    </Typography>
                    <p className={classes.content}>
                        The STORET Data Warehouse is USEPA&quot;s repository of the water
                        quality monitoring data collected by water resource management groups across the country. These
                        organizations, including states, tribes, watershed groups, other federal agencies, volunteer
                        groups and universities, submit data to the STORET Warehouse in order to make their data
                        publically accessible. Data can then be re-used for analysis. WQX is the framework by which
                        organizations submit data to the Warehouse.
                        <br />
                        <a href="#toc" className={classes.link}>[top]</a>
                    </p>
                </Container>
                <Container>
                    <Typography
                        className={classes.subHeader}
                        variant="h5"
                        noWrap
                        gutterBottom
                    >
                        WQX
                    </Typography>
                    <p className={classes.content}>
                        Groups submit data to the STORET Data Warehouse through a
                        framework called the Water Quality Exchange, or WQX. WQX is not a distributed database that
                        people use, but rather a standard way of sharing data to the STORET Data Warehouse, using the
                        National Environmental Information Exchange Network. The WQX framework consists of
                        different pieces. First, WQX defines a standard set of data elements that must be captured in a
                        data submission file in order for the data to come into the STORET Data Warehouse. Second, WQX
                        uses a standard set of internet protocols that define how a data submission is made to the
                        USEPA. Please go to the WQX page for more information about how WQX works.
                        <br />
                        <a href="#toc" className={classes.link}>[top]</a>
                    </p>
                </Container>
                <Container>
                    <Typography
                        className={classes.subHeader}
                        variant="h5"
                        noWrap
                        gutterBottom
                    >
                        UMESC/LTRM - NGRREC<sup>SM</sup>
                    </Typography>
                    <p className={classes.content}>
                        UMESC/LTRM - NGRREC affiliates with the Illinois Natural
                        History Survey (INHS) are one of six groups (Lake City, Minnesota; La Crosse, Wisconsin;
                        Bellevue, Iowa; Great Rivers and Havana, Illinois; and Open Rivers and Wetlands, Missouri)
                        nationally collecting fish population and water quality data for the Upper Mississippi
                        Environmental Sciences Center’s (UMESC) Long Term Resource Monitoring Program (LTRM). An
                        element of the Upper Mississippi River Restoration – Environmental Management Program
                        (UMRR-EMP) funded by the U.S. Army Corps of Engineers, LTRM conducts monitoring, focused
                        research projects and evaluates the success of habitat projects on the Upper Mississippi River
                        System. Since beginning in 1986, LTRM has compiled one of the most comprehensive long-term
                        data sets for any major ecosystem in the world.
                        <br />
                        <a href="#toc" className={classes.link}>[top]</a>
                    </p>
                </Container>
            </Container>
            <Container id="wqp">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    Water Quality Portal (WQP)
                </Typography>
                <p className={classes.content}>
                    The Water Quality Portal (WQP) is a cooperative service
                    sponsored by the United States Geological Survey (USGS), the Environmental Protection Agency
                    (USEPA) and the National Water Quality Monitoring Council (NWQMC) that integrates publicly
                    available water quality data from the USGS National Water Information System (NWIS), the USEPA
                    STOrage and RETrieval (STORET) Data Warehouse, and the USDA ARS Sustaining The Earth’s
                    Watersheds - Agricultural Research Database System (STEWARDS). The WQP serves data collected by
                    over 400 state, federal, tribal, and local agencies. As of February 2014, over 228 million
                    results from over 2.2 million monitoring locations are currently accessible through the portal.
                    The portal reports samples and results collected from each location since the beginning of the
                    databases.
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
            </Container>
            <Container id="usace">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    United States Army Corps of Engineers (USACE)
                </Typography>
                <p className={classes.content}>
                    The U.S. Army Corps of Engineers (USACE) is a dynamic
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
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
            </Container>
            <Container id="ngrrec">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    National Great Rivers Research and Education Center (NGRREC)
                </Typography>
                <p className={classes.content}>
                    National Great Rivers Research and Education Center (NGRREC)
                    was established in 2002 as a partnersship between the Illinois Natural History Survey, the
                    University of Illinois at Urbana-Champaign and Lewis and Clark Community College in Godfrey,
                    IL. Each institution brings unique strengths to the partnership including the Survey’s history
                    and experience with monitoring the state’s rivers, the University of Illinois’ world-class
                    research expertise and Lewis and Clark’s location as a hub in the community at the confluence of
                    the state’s great rivers. The unique partnership has enabled the Center’s rapid growth and
                    contributions to watershed research and education.
                    <br />
                    <br />
                    Learn more about the&nbsp;
                    <a className={classes.link} href="http://www.ngrrec.org" target="_blank" rel="noopener noreferrer">
                        National Great Rivers Research and Education Center
                    </a>
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
            </Container>
            <Container id="inhs">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    Illinois Natural History Survey Center (INHS)
                </Typography>
                <p className={classes.content}>
                    Since 1858, the Illinois Natural History Survey Center (INHS)
                    has been the guardian and recorder of the biological resources of Illinois---the
                    state&quot;s biological memory. With a staff of over 200 scientists and technicians, it is
                    recognized as the premier natural history survey in the nation. Over the years, its mission has
                    remained fairly constant: to investigate the diversity, life histories, and ecology of the plants
                    and animals of the state; to publish research results so that those resources can be managed wisely;
                    and to provide information to the public in order to foster an understanding and appreciation of
                    our natural heritage.
                    <br />
                    <br />
                    Learn more about the&nbsp;
                    <a
                        className={classes.link}
                        href="http://www.inhs.illinois.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Illinois Natural History Survey
                    </a>.
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
            </Container>
            <Container id="lac">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    Lewis and Clark Community College (LCC)
                </Typography>
                <p className={classes.content}>
                    Lewis and Clark Community College (LCC) is a two-year
                    higher education institution with multiple campuses, a river research center, Community
                    Education Centers and training centers located throughout the 220,891-person college
                    district, which reaches into seven counties. Founded in 1970 with 450 students, today Lewis and
                    Clark serves approximately 26,000 students annually.
                    <br />
                    <br />
                    Learn more about&nbsp;
                    <a className={classes.link} href="http://www.lc.edu" target="_blank" rel="noopener noreferrer">
                        Lewis and Clark Community College
                    </a>.
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
            </Container>
            <Container id="uiuc">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    University of Illinois at Urbana-Champaign (UIUC)
                </Typography>
                <p className={classes.content}>
                    The University of Illinois at Urbana-Champaign (UIUC) is the
                    state’s flagship public university and a world leader in research, teaching, and public
                    engagement. A land-grant university, Illinois is distinguished by the breadth of its
                    programs, broad academic excellence, and internationally renowned faculty. The University of
                    Illinois serves the state, the nation, and the world by creating knowledge, preparing students
                    for lives of impact, and addressing critical societal needs through the transfer and application
                    of knowledge.
                    <br />
                    <br />
                    Learn more about the&nbsp;
                    <a
                        className={classes.link}
                        href="http://www.illinois.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        University of Illinois at Urbana-Champaign
                    </a>.
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
            </Container>
            <Container id="seagrant">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    Illinois-Indiana Sea Grant (IISG)
                </Typography>
                <p className={classes.content}>
                    Illinois-Indiana Sea Grant (IISG), with its unique
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
                    the general public to work towards a healthy environment and economy.
                    <br />
                    <br />
                    Learn more about&nbsp;
                    <a className={classes.link} href="http://www.iisgcp.org/" target="_blank" rel="noopener noreferrer">
                        Illinois-Indiana Sea Grant
                    </a>.
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
            </Container>
            <Container id="ncsa">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    National Center for Supercomputing Applications (NCSA)
                </Typography>
                <p className={classes.content}>
                    The National Center for Supercomputing Applications (NCSA
                    provides computing, data, networking, and visualization resources and services that help
                    scientists and engineers across the country better understand our world. NCSA is an
                    interdisciplinary hub and is engaged in research and education collaborations with colleagues
                    and students across the campus of the University of Illinois at
                    Urbana-Champaign. Established in 1986 as one of the original sites of the National
                    Science Foundation&quot;s Supercomputer Centers Program, NCSA is supported by the state of Illinois,
                    the University of Illinois, the National Science Foundation, and grants from other federal
                    agencies. The center focuses on big computing, big data, and big research.
                    <br />
                    <br />
                    Learn more about the&nbsp;
                    <a
                        className={classes.link}
                        href="http://www.ncsa.illinois.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        NCSA
                    </a>.
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
            </Container>
            <Container id="ilepa">
                <Typography
                    className={classes.subHeader}
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    Illinois Environmental Protection Agency
                </Typography>
                <p className={classes.content}>
                    Learn more about the&nbsp;
                    <a
                        className={classes.link}
                        href="http://www.epa.illinois.gov"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Illinois EPA
                    </a>.
                    <br />
                    <a href="#toc" className={classes.link}>[top]</a>
                </p>
            </Container>
        </Container>
    );
};

export default Partners;
