import React from 'react'
import Layout from '../components/Layout'

class Help extends React.Component {
  render () {
    var fieldStyle = {
      color: '#4169E1',
      fontWeight: 'bold'
    }
    return (
      <Layout>
        <h2>User interface help</h2>
        <h4>Current node types are:</h4>
        <ul>
          <li>
            <strong style={fieldStyle}>Campaign</strong>: Describes sets of Incidents and/or TTPs with a shared intent.
          </li>
          <li>
            <strong style={fieldStyle}>Course_Of_Action</strong>: Describes response actions that may be taken in response to an attack or as a preventative measure.
          </li>
          <li>
            <strong style={fieldStyle}>Exploit_Target</strong>: Describes vulnerabilities, weaknesses, or configurations that might be exploited.
          </li>
          <li>
            <strong style={fieldStyle}>Observable</strong>: Describes what has been or might be seen in cyber.
          </li>
          <li>
            <strong style={fieldStyle}>Incident</strong>: Describes instances of specific adversary actions.
          </li>
          <li>
            <strong style={fieldStyle}>Indicator</strong>: Describes patterns for what might be seen and what they mean if they are.
          </li>
          <li>
            <strong style={fieldStyle}>Threat_Actor</strong>: Describes identification and/or characterization of the adversary.
          </li>
          <li>
            <strong style={fieldStyle}>TTP</strong>: Adversary Tactics, Techniques, and Procedures describe attack patterns, malware, exploits, kill chains, tools, infrastructure, victim targeting, and other methods used by the adversary.
          </li>
          <li>
            <strong style={fieldStyle}>Vulnerability</strong>: A flaw in some software, that can cause improper, unintended operation, and can potentially be exploited as part of an attack..
          </li>
          <li>
            <strong style={fieldStyle}>Weaknesses</strong>: Describes weaknesses of computer software.
          </li>
          <li>
            <strong style={fieldStyle}>IP</strong>: A specific IP address.
          </li>
          <li>
            <strong style={fieldStyle}>AddressRange</strong>: A range of IP addresses.
          </li>
          <li>
            <strong style={fieldStyle}>Exploit</strong>: Used by malware to exploit software with vulnerabilities or weaknesses.
          </li>
          <li>
            <strong style={fieldStyle}>Malware</strong>: Any malicious software. This can refer to either a stored binary or a running instance. Malware can contain code to launch an exploit. Malware can itself be an asset that an attacker uses in future attacks (eg. a backdoor left on a compromised system.) or can automatically launch additional attacks on behalf of the original attacker. Malware can be hosted by or communicate with servers controlled by the attacker. Malware can contain code to load other malware. Malware can reuse components from other malware samples.
          </li>
        </ul>
        <h4>Node fields:</h4>
        <ul>
          <li>
            <div>
              <h5>Common node fields:</h5>
              <ul>
                <li>
                  <code>vertexType</code>: Node type
                </li>
                <li>
                  <code>name</code>: Node name
                </li>
                <li>
                  <code>description</code>: Node description
                </li>
                <li>
                  <code>source</code>: Node information source
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <h5>Unique node fields by node type:</h5>
              <ul>
                <li>
                  <strong style={fieldStyle}>AddressRange</strong>
                  <ul>
                    <li>
                      <code>observableType</code>: Type of CybOX object used to describe this node
                    </li>
                    <li>
                      <code>startIP</code>: Start IP
                    </li>
                    <li>
                      <code>endIP</code>: End IP
                    </li>
                    <li>
                      <code>startIPInt</code>: Integer of start IP
                    </li>
                    <li>
                      <code>endIPInt</code>: Integer of end IP
                    </li>
                    <li>
                      <code>location</code>: Country of AddressRange
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
                      <code>observableType</code>: Type of CybOX object used to describe this node
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
                      <code>observableType</code>: Type of CybOX object used to describe this node
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <h4>Node search:</h4>
        <div>
          Currently, search can be performed on:
          <ul>
            <li>
              <code>vertexType</code>: Get first 20 <strong>Vulnerabilities</strong>: <a>/resultslist/search/vertexType=Vulnerability&page=0&pageSize=20</a>
            </li>
            <li>
              <code>name</code>: Get <strong>Port 80</strong>: <a>/resultslist/search/name=80&page=0&pageSize=1</a>
            </li>
            <li>
              <code>observableType</code>: Get first 10 <strong>Socket Addresses</strong>: <a>/resultslist/search/observableType=Socket%20Address&page=0&pageSize=10</a>
            </li>
            <li>
              <code>ipInt</code>: Get <strong>IP</strong> by <strong>ipInt</strong>: <a>/resultslist/search/ipInt=2130706616&page=0&pageSize=1</a>
            </li>
            <li>
              <code>startIPInt</code>: Get <strong>IP</strong> by <strong>startIPInt</strong>: <a>/resultslist/search/startIPInt=2130706616&page=0&pageSize=1</a>
            </li>
            <li>
              <code>endIPInt</code>: Get <strong>IP</strong> by <strong>endIPInt</strong>: <a>/resultslist/search/endIPInt=2130706616&page=0&pageSize=1</a>
            </li>
          </ul>
        </div>
        <h2>API help</h2>
        <p>
          The HTTP/JSON API can also be called directly. Here are some examples (copy into a terminal to run using curl).
        </p>
        <h4>Search by <code>id</code></h4>
        <p>
          Get information on a Vulnerability with known <code>id</code>: <kbd>curl -XGET -i -H 'accept-encoding: application/json' URL /api/vertex/stucco:vulnerability-f6e40756-f29f-462c-aa9d-3c90af97626f</kbd>
        </p>
        <h4>Search by <code>vertexType</code></h4>
        <p>
          Get first page (20 entries) of <strong>Observables</strong>: <kbd>curl -XGET -i -H 'accept-encoding: application/json' URL /api/search?q=%7BvertexType:Observable,page:0,pageSize:20%7D</kbd>
        </p>
      </Layout>
    )
  }
}

export default Help
