import React from 'react'
import spdf from 'simple-react-pdf'

import Layout from '../components/Layout'

import ontology from '../ontology/stucco_graph.pdf'

class Help extends React.Component {
  render () {
    var margin = {
      margin: '50px 50px 50px 50px'
    }
    var fieldStyle = {
      color: '#4169E1',
      fontWeight: 'bold'
    }
    return (
      <Layout>
      <div style={margin}>
        <h2>User interface help</h2>
        <h4>Ontology:</h4>
        <ul>
          <li>
            <a href='/ontology/stix'><strong style={fieldStyle}>STIX ontology</strong></a>
          </li>
          <li>
            <a href='/ontology/stucco'><strong style={fieldStyle}>Stucco ontology</strong></a>
          </li>
        </ul>
        <h4>Current vertex types are:</h4>
        <ul>
          <li>
            <a href='/resultslist/search/vertexType=Campaign&page=0&pageSize=20'><strong style={fieldStyle}>Campaign</strong></a>: Describes sets of Incidents and/or TTPs with a shared intent.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Course_Of_Action&page=0&pageSize=20'><strong style={fieldStyle}>Course_Of_Action</strong></a>: Describes response actions that may be taken in response to an attack or as a preventative measure.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Exploit_Target&page=0&pageSize=20'><strong style={fieldStyle}>Exploit_Target</strong></a>: Describes vulnerabilities, weaknesses, or configurations that might be exploited.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Observable&page=0&pageSize=20'><strong style={fieldStyle}>Observable</strong></a>: Describes what has been or might be seen in cyber.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Incident&page=0&pageSize=20'><strong style={fieldStyle}>Incident</strong></a>: Describes instances of specific adversary actions.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Indicator&page=0&pageSize=20'><strong style={fieldStyle}>Indicator</strong></a>: Describes patterns for what might be seen and what they mean if they are.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Threat_Actor&page=0&pageSize=20'><strong style={fieldStyle}>Threat_Actor</strong></a>: Describes identification and/or characterization of the adversary.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=TTP&page=0&pageSize=20'><strong style={fieldStyle}>TTP</strong></a>: Adversary Tactics, Techniques, and Procedures describe attack patterns, malware, exploits, kill chains, tools, infrastructure, victim targeting, and other methods used by the adversary.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Vulnerability&page=0&pageSize=20'><strong style={fieldStyle}>Vulnerability</strong></a>: A flaw in some software, that can cause improper, unintended operation, and can potentially be exploited as part of an attack.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Weakness&page=0&pageSize=20'><strong style={fieldStyle}>Weakness</strong></a>: Describes weaknesses of computer software.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=IP&page=0&pageSize=20'><strong style={fieldStyle}>IP</strong></a>: A specific IP address.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=AddressRange&page=0&pageSize=20'><strong style={fieldStyle}>AddressRange</strong></a>: A range of IP addresses.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Exploit&page=0&pageSize=20'><strong style={fieldStyle}>Exploit</strong></a>: Used by malware to exploit software with vulnerabilities or weaknesses.
          </li>
          <li>
            <a href='/resultslist/search/vertexType=Malware&page=0&pageSize=20'><strong style={fieldStyle}>Malware</strong></a>: Any malicious software. This can refer to either a stored binary or a running instance. Malware can contain code to launch an exploit. Malware can itself be an asset that an attacker uses in future attacks (eg. a backdoor left on a compromised system.) or can automatically launch additional attacks on behalf of the original attacker. Malware can be hosted by or communicate with servers controlled by the attacker. Malware can contain code to load other malware. Malware can reuse components from other malware samples.
          </li>
        </ul>
        <h4>Vertex fields:</h4>
        <ul>
          <li>
            <div>
              <h5>Common vertex fields:</h5>
              <ul>
                <li>
                  <code>vertexType</code>: Vertex type
                </li>
                <li>
                  <code>name</code>: Vertex name
                </li>
                <li>
                  <code>description</code>: Vertex description
                </li>
                <li>
                  <code>source</code>: Vertex information source
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <h5>Unique vertex fields by vertex type:</h5>
              <ul>
                <li>
                  <strong style={fieldStyle}>AddressRange</strong>
                  <ul>
                    <li>
                      <code>observableType</code>: Type of CybOX object used to describe this vertex
                    </li>
                    <li>
                      <code>startIP</code>: Start IP
                    </li>
                    <li>
                      <code>endIP</code>: End IP
                    </li>
                    <li>
                      <code>startIPInt</code>: Integer representation of start IP
                    </li>
                    <li>
                      <code>endIPInt</code>: Integer representation of end IP
                    </li>
                    <li>
                      <code>location</code>: Country of this AddressRange
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>IP</strong>
                  <ul>
                    <li>
                      <code>ipInt</code>: Integer representation of this IP
                    </li>
                    <li>
                      <code>observableType</code>: Type of CybOX object used to describe this vertex
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Exploit</strong>
                  <ul>
                    <li>
                      <code>shortDescription</code>: Short description of this Exploit
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Malware</strong>
                  <ul>
                    <li>
                      <code>alias</code>: Set of names associated with this Malware
                    </li>
                    <li>
                      <code>shortDescription</code>: Short description of this Malware
                    </li>
                    <li>
                      <code>details</code>: Detailed behavior of this Malware
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Vulnerability</strong>
                  <ul>
                    <li>
                      <code>shortDescription</code>: Short description of this Vulnerability
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Campaign</strong>
                  <ul>
                    <li>
                      <code>alias</code>: Set of names associated with this Campaign
                    </li>
                    <li>
                      <code>shortDescription</code>: Short description of this Campaign
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Course_Of_Action</strong>
                  <ul>
                    <li>
                      <code>shortDescription</code>: Short description of this Course_Of_Action
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Exploit_Target</strong>
                  <ul>
                    <li>
                      <code>shortDescription</code>: Short description of this Exploit_Target
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Incident</strong>
                  <ul>
                    <li>
                      <code>shortDescription</code>: Short description of this Incident
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Indicator</strong>
                  <ul>
                    <li>
                      <code>shortDescription</code>: Short description of this Indicator
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Threat_Actor</strong>
                  <ul>
                    <li>
                      <code>shortDescription</code>: Short description of this Threat_Actor
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>TTP</strong>
                  <ul>
                    <li>
                      <code>shortDescription</code>: Short description of this TTP
                    </li>
                  </ul>
                </li>
                <li>
                  <strong style={fieldStyle}>Observable</strong>
                  <ul>
                    <li>
                      <code>alias</code>: Set of names associated with this Observable
                    </li>
                    <li>
                      <code>observableType</code>: Type of CybOX object used to describe this vertex
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <h4>Vertex search:</h4>
        <div>
          Currently, search can be performed on:
          <ul>
            <li>
              <code>vertexType</code>: Get first 20 <strong>Vulnerabilities</strong>: <a href='/resultslist/search/vertexType=Vulnerability&page=0&pageSize=20'>/resultslist/search/vertexType=Vulnerability&page=0&pageSize=20</a>
            </li>
            <li>
              <code>name</code>: Get <strong>Port 80</strong>: <a href='/resultslist/search/name=80&page=0&pageSize=1'>/resultslist/search/name=80&page=0&pageSize=1</a>
            </li>
            <li>
              <code>observableType</code>: Get first 10 <strong>Socket Addresses</strong>: <a href='/resultslist/search/observableType=Socket%20Address&page=0&pageSize=10'>/resultslist/search/observableType=Socket%20Address&page=0&pageSize=10</a>
            </li>
            <li>
              <code>ipInt</code>: Get <strong>IP</strong> by <strong>ipInt</strong>: <a href='/resultslist/search/ipInt=2130706616&page=0&pageSize=1'>/resultslist/search/ipInt=2130706616&page=0&pageSize=1</a>
            </li>
            <li>
              <code>startIPInt</code>: Get <strong>IP</strong> by <strong>startIPInt</strong>: <a href='/resultslist/search/startIPInt=2130706616&page=0&pageSize=1'>/resultslist/search/startIPInt=2130706616&page=0&pageSize=1</a>
            </li>
            <li>
              <code>endIPInt</code>: Get <strong>IP</strong> by <strong>endIPInt</strong>: <a href='/resultslist/search/endIPInt=2130706616&page=0&pageSize=1'>/resultslist/search/endIPInt=2130706616&page=0&pageSize=1</a>
            </li>
          </ul>
        </div>
        <h2>API help</h2>
        <p>
          The HTTP/JSON API can also be called directly. Here are some examples (copy into a terminal to run using curl).
        </p>
        <h4>Search by database <code>id</code></h4>
        <p>
          Get information on a Vulnerability with known database <code>id</code>: <kbd>curl -XGET -i -H 'accept-encoding: application/json' URL /api/vertex/stucco:vulnerability-f6e40756-f29f-462c-aa9d-3c90af97626f</kbd>
        </p>
        <pre>
          HTTP/1.1 200 OK{'\n'}
          Access-control-allow-headers: origin, content-type, accept, authorization{'\n'}
          Date: Thu, 19 Jan 2017 20:56:04 GMT{'\n'}
          Access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS, HEAD{'\n'}
          Content-type: application/json{'\n'}
          Access-control-allow-origin: URL{'\n'}
          Access-control-allow-credentials: true{'\n'}
          Content-length: 1460{'\n'}

          {JSON.stringify('{"success":true,"count":1,"queryTime":"","results":{"vertexType":"Weakness","sourceDocument":"<et:Exploit_Target xmlns:stixCommon=\"http://stix.mitre.org/common-1\" xmlns:coa=\"http://stix.mitre.org/CourseOfAction-1\" xmlns:stucco=\"gov.ornl.stucco\" xmlns:et=\"http://stix.mitre.org/ExploitTarget-1\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"stucco:et-52962ed3-1c7f-4cac-bedb-d49bb429b625\" xsi:type=\"et:ExploitTargetType\" xmlns=\"http://xml/metadataSharing.xsd\"><et:Title>Exploit_Target<\/et:Title><et:Description>Description<\/et:Description><et:Weakness><et:Description>Description of this weakness<\/et:Description><et:CWE_ID>CWE-93487297<\/et:CWE_ID><\/et:Weakness><et:Potential_COAs><et:Potential_COA><stixCommon:Course_Of_Action idref=\"stucco:coa-ba3d4963-caa5-4f65-b224-8f0d5ab38aa7\" xsi:type=\"coa:CourseOfActionType\"><\/stixCommon:Course_Of_Action><\/et:Potential_COA><\/et:Potential_COAs><et:Information_Source><stixCommon:Identity><stixCommon:Name>Source<\/stixCommon:Name><\/stixCommon:Identity><stixCommon:Contributing_Sources><stixCommon:Source><stixCommon:Identity><stixCommon:Name>Contributing source<\/stixCommon:Name><\/stixCommon:Identity><\/stixCommon:Source><\/stixCommon:Contributing_Sources><\/et:Information_Source><\/et:Exploit_Target>","name":"CWE-93487297","description":["Description of this weakness"],"source":["Source","Contributing source"],"_id":"stucco:et-52962ed3-1c7f-4cac-bedb-d49bb429b625"},"version":""}')}
        </pre>
        <h4>Search by <code>vertexType</code></h4>
        <p>
          Get first 2 entries of <strong>Observables</strong>: <kbd>curl -XGET -i -H 'accept-encoding: application/json' URL /api/search?q=%7BvertexType:Observable,page:0,pageSize:20%7D</kbd>
        </p>
        <pre>
          HTTP/1.1 200 OK{'\n'}
          Access-control-allow-headers: origin, content-type, accept, authorization{'\n'}
          Date: Thu, 19 Jan 2017 21:18:15 GMT{'\n'}
          Access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS, HEAD{'\n'}
          Content-type: application/json{'\n'}
          Access-control-allow-origin: URL{'\n'}
          Access-control-allow-credentials: true{'\n'}
          Content-length: 3144{'\n'}

          {JSON.stringify('{"success":true,"count":2,"queryTime":"","results":[{"vertexType":"Observable","sourceDocument":"<cybox:Observable xmlns:cybox=\"http://cybox.mitre.org/cybox-2\" xmlns:stucco=\"gov.ornl.stucco\" id=\"stucco:flow-da6b7a73-6ed4-4d9a-b8dd-b770e2619ffb\"><cybox:Title>Flow<\/cybox:Title><cybox:Observable_Source><cyboxCommon:Information_Source_Type xmlns:cyboxCommon=\"http://cybox.mitre.org/common-2\">Argus<\/cyboxCommon:Information_Source_Type><\/cybox:Observable_Source><cybox:Object id=\"stucco:flow-168430081_56867-168430180_22\"><cybox:Description>10.10.10.1, port 56867 to 10.10.10.100, port 22<\/cybox:Description><cybox:Properties xmlns:NetFlowObj=\"http://cybox.mitre.org/objects#NetworkFlowObject-2\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:type=\"NetFlowObj:NetworkFlowObjectType\"><cyboxCommon:Custom_Properties xmlns:cyboxCommon=\"http://cybox.mitre.org/common-2\"><cyboxCommon:Property name=\"TotBytes\">585<\/cyboxCommon:Property><cyboxCommon:Property name=\"Flgs\"> e s<\/cyboxCommon:Property><cyboxCommon:Property name=\"State\">REQ<\/cyboxCommon:Property><cyboxCommon:Property name=\"StartTime\">1373553586.136399<\/cyboxCommon:Property><cyboxCommon:Property name=\"Dir\">-&gt;<\/cyboxCommon:Property><cyboxCommon:Property name=\"TotPkts\">8<\/cyboxCommon:Property><\/cyboxCommon:Custom_Properties><NetFlowObj:Network_Flow_Label><NetFlowObj:Src_Socket_Address object_reference=\"stucco:address-f6e40756-f29f-462c-aa9d-3c90af97626f\" /><NetFlowObj:Dest_Socket_Address object_reference=\"stucco:address-046baefe-f1d0-45ee-91c3-a9a22a7e6ddd\" /><NetFlowObj:IP_Protocol>6<\/NetFlowObj:IP_Protocol><\/NetFlowObj:Network_Flow_Label><\/cybox:Properties><\/cybox:Object><\/cybox:Observable>","name":"10.10.10.1:56867_through_10.10.10.100:22","description":["10.10.10.1, port 56867 to 10.10.10.100, port 22"],"source":["Argus"],"_id":"stucco:flow-da6b7a73-6ed4-4d9a-b8dd-b770e2619ffb","observableType":"Network Flow"},{"vertexType":"Observable","sourceDocument":"<cybox:Observable xmlns:cybox=\"http://cybox.mitre.org/cybox-2\" xmlns:stucco=\"gov.ornl.stucco\" id=\"stucco:address-f6e40756-f29f-462c-aa9d-3c90af97626f\"><cybox:Title>Address<\/cybox:Title><cybox:Observable_Source><cyboxCommon:Information_Source_Type xmlns:cyboxCommon=\"http://cybox.mitre.org/common-2\">Argus<\/cyboxCommon:Information_Source_Type><\/cybox:Observable_Source><cybox:Object id=\"stucco:address-168430081_56867\"><cybox:Description>10.10.10.1, port 56867<\/cybox:Description><cybox:Properties xmlns:SocketAddressObj=\"http://cybox.mitre.org/objects#SocketAddressObject-1\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:type=\"SocketAddressObj:SocketAddressObjectType\"><SocketAddressObj:IP_Address object_reference=\"stucco:ip-8134dbc0-ffa4-44cd-89d2-1d7428c08489\" /><SocketAddressObj:Port object_reference=\"stucco:Observable-ee61836a-fee6-482e-90f2-19fba3003c5a\" /><\/cybox:Properties><\/cybox:Object><\/cybox:Observable>","name":"10.10.10.1:56867","description":["10.10.10.1, port 56867"],"source":["Argus"],"_id":"stucco:address-f6e40756-f29f-462c-aa9d-3c90af97626f","observableType":"Socket Address"}],"version":""}')}
        </pre>
      </div>
      </Layout>
    )
  }
}

export default Help
