import{_ as n,V as s,W as a,X as e}from"./framework-590fd356.js";const t={},p=e(`<h2 id="how-to-create-a-serverless-web-app-on-aws" tabindex="-1"><a class="header-anchor" href="#how-to-create-a-serverless-web-app-on-aws" aria-hidden="true">#</a> How to create a serverless web app on AWS</h2><p>To create a serverless web app on AWS with CDK, you can follow these steps:</p><h4 id="install-the-aws-cdk-cli-and-create-a-new-cdk-project" tabindex="-1"><a class="header-anchor" href="#install-the-aws-cdk-cli-and-create-a-new-cdk-project" aria-hidden="true">#</a> Install the AWS CDK CLI and create a new CDK project:</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Install the AWS CDK CLI</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> aws-cdk-cli

<span class="token comment"># Create a new CDK project</span>
cdk init sample-app <span class="token parameter variable">--language</span><span class="token operator">=</span>typescript

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="add-the-required-dependencies-to-your-project" tabindex="-1"><a class="header-anchor" href="#add-the-required-dependencies-to-your-project" aria-hidden="true">#</a> Add the required dependencies to your project:</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Install the AWS Lambda and Amazon S3 library</span>
<span class="token function">npm</span> <span class="token function">install</span> @aws-cdk/aws-lambda @aws-cdk/aws-s3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Define your CDK stack and add the necessary resources. You can do this in the <code>lib/sample-app-stack.ts</code> file:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&#39;aws-cdk-lib&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> s3 <span class="token keyword">from</span> <span class="token string">&#39;@aws-cdk/aws-s3&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> lambda <span class="token keyword">from</span> <span class="token string">&#39;@aws-cdk/aws-lambda&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">SampleAppStack</span> <span class="token keyword">extends</span> <span class="token class-name">cdk<span class="token punctuation">.</span>Stack</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">scope</span><span class="token operator">:</span> cdk<span class="token punctuation">.</span>App<span class="token punctuation">,</span> <span class="token literal-property property">id</span><span class="token operator">:</span> string<span class="token punctuation">,</span> props<span class="token operator">?</span><span class="token operator">:</span> cdk<span class="token punctuation">.</span>StackProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>scope<span class="token punctuation">,</span> id<span class="token punctuation">,</span> props<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Create an S3 bucket to store the website files</span>
    <span class="token keyword">const</span> websiteBucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">s3<span class="token punctuation">.</span>Bucket</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&#39;WebsiteBucket&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">websiteIndexDocument</span><span class="token operator">:</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">publicReadAccess</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Create a Lambda function to serve the website</span>
    <span class="token keyword">const</span> websiteFunction <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">lambda<span class="token punctuation">.</span>Function</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&#39;WebsiteFunction&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">runtime</span><span class="token operator">:</span> lambda<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span><span class="token constant">NODEJS_12_X</span><span class="token punctuation">,</span>
      <span class="token literal-property property">code</span><span class="token operator">:</span> lambda<span class="token punctuation">.</span>Code<span class="token punctuation">.</span><span class="token function">asset</span><span class="token punctuation">(</span><span class="token string">&#39;website&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token literal-property property">handler</span><span class="token operator">:</span> <span class="token string">&#39;index.handler&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">environment</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token constant">BUCKET_NAME</span><span class="token operator">:</span> websiteBucket<span class="token punctuation">.</span>bucketName<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Grant the Lambda function permission to access the S3 bucket</span>
    websiteBucket<span class="token punctuation">.</span><span class="token function">grantRead</span><span class="token punctuation">(</span>websiteFunction<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Create the website directory and add the necessary files for your web app. For example, you can add an index.html file and a <code>handler.js</code> file:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// website/handler.js</span>
exports<span class="token punctuation">.</span><span class="token function-variable function">handler</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> bucketName <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BUCKET_NAME</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> fileKey <span class="token operator">=</span> event<span class="token punctuation">.</span>path<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">;</span>

  <span class="token comment">// Get the object from the S3 bucket</span>
  <span class="token keyword">const</span> s3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AWS<span class="token punctuation">.</span>S3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> file <span class="token operator">=</span> <span class="token keyword">await</span> s3<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">Bucket</span><span class="token operator">:</span> bucketName<span class="token punctuation">,</span> <span class="token literal-property property">Key</span><span class="token operator">:</span> fileKey <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">promise</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Return the object in the response</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">statusCode</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
    <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> file<span class="token punctuation">.</span>ContentType<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">body</span><span class="token operator">:</span> file<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Deploy the stack:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cdk deploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container info"><p class="custom-container-title">Info</p><p>This will create the necessary resources on AWS, including the S3 bucket and the Lambda function. You can then upload your web app files to the S3 bucket and access them through the Lambda function.</p></div>`,13),o=[p];function c(l,i){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","aws-cdk-web-app.html.vue"]]);export{u as default};
