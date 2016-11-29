import React from 'react'
import Layout from '../components/Layout'

class Help extends React.Component {
  render () {
    return (
      <Layout>
        <h2>User interface help</h2>
        <p>
          Queries default to search the <code>name</code> field when using the search box, but you can also search on <code>type</code> and <code>description</code>. Here are some example queries (click to run the query).
        </p>
        <h4>Search by name</h4>
        <p>
          Get information on a vulnerability, <strong>CVE-2014-9423</strong>: <a href='/search/CVE-2014-9423'>/search/CVE-2014-9423</a>
        </p>
        <p>
          Get information on an IP:port, <strong>10.32.92.230:41721</strong>: <a href='/search/name=10.32.92.230:41721'>/search/name=10.32.92.230:41721</a>
        </p>
        <h4>Search by type</h4>
        <p>
          Get <strong>all vulnerabilities</strong>: <a href='/search/type=vulnerability'>/search/type=vulnerability</a>
        </p>
        <p>
          Current node types are:
        </p>
        <ul>
          <li>
            <a href='/search/type=account'>Account</a>: An account on some specific system(s), either belonging to some specific user or a system account. All software runs as some account. All accounts are associated with a user or users (such as system accounts.)
          </li>
          <li>
            <a href='/search/type=host'>Host</a>: Any entity on the network, including PCs, routers, switches, virtual machines, etc.
          </li>
          <li>
            <a href='/search/type=software'>Software</a>: Any software components on a system, including OSes, applications, services, and libraries.
          </li>
          <li>
            <a href='/search/type=vulnerability'>Vulnerability</a>: A flaw in some software, that can cause improper, unintended operation, and can potentially be exploited as part of an attack.
          </li>
          <li>
            <a href='/search/type=malware'>Malware</a>: Any malicious software. This can refer to either a stored binary or a running instance. Malware can contain code to launch an exploit. Malware can itself be an asset that an attacker uses in future attacks (eg. a backdoor left on a compromised system.) or can automatically launch additional attacks on behalf of the original attacker. Malware can be hosted by or communicate with servers controlled by the attacker. Malware can contain code to load other malware. Malware can reuse components from other malware samples.
          </li>
          <li>
            <a href='/search/type=IP'>IP</a>: A specific IP address.
          </li>
          <li>
            <a href='/search/type=DNSName'>DNS Name</a>: A DNS name (and possibly associated info - registration info, etc.).
          </li>
          <li>
            <a href='/search/type=port'>Port</a>: A specific network port.
          </li>
          <li>
            <a href='/search/type=address'>Address</a>: Any address (IP:Port), either inside or outside of the network.
          </li>
          <li>
            <a href='/search/type=flow'>Flow</a>: A flow of traffic between two addresses.
          </li>
          <li>
            <a href='/search/type=addressRange'>Address Range</a>: A range of IP addresses.
          </li>
        </ul>
        <h4>Search by description</h4>
        <p>
          Get information on any node that involves <strong>cross-site scripting</strong>: <a href='/search/description=cross-site scripting'>/search/description=cross-site scripting</a>
        </p>
        <p>
          The description field can handle full-text searches.
        </p>
        <h2>API help</h2>
        <p>
          The HTTP/JSON API can also be called directly. Here are some examples (copy into a terminal to run using curl).
        </p>
        <h4>Search by name</h4>
        <p>
          Get information on a vulnerability, <strong>CVE-2014-9423</strong>: <kbd>curl -XGET -i -H 'accept-encoding: application/json' URL /api/search\\?name\\=CVE-2014-9423</kbd>
        </p>
        <pre>
          $ curl -XGET -i -H 'accept-encoding: application/json' URL /api/search\\?name\\=CVE-2014-9423\nHTTP/1.1 200 OK\nX-Powered-By: Express\nX-XSS-Protection: 1; mode=block\nX-Content-Type-Options: nosniff\nContent-Type: application/json; charset=utf-8\nContent-Length: 1007\n
          ETag: W/"ruChy4ddVG3a+zgMM7n0xQ=="\nVary: Accept-Encoding\nDate: Fri, 20 Feb 2015 20:53:56 GMT\nConnection: keep-alive\n\n
        </pre>
        <h4>Search by type</h4>
        <p>
          Get <strong>all vulnerabilities</strong> (will only return a few results, you will need to use paging to get more): <kbd>curl -XGET -i -H 'accept-encoding: application/json' URL /api/search\\?vertexType\\=malware</kbd>
        </p>
      </Layout>
    )
  }
}

export default Help
