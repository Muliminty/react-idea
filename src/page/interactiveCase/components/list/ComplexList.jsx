import { useState, useEffect, useRef } from 'react';
import 'animate.css'; // 引入 animate.css 样式
import { VariableSizeList as List } from 'react-window'; // 使用 react-window 虚拟化列表
import './ComplexList.scss'; // 引入自定义的样式

// mockData.js
const mockGetPosts = (count = 100) => {
    return new Array(count).fill(null).map((_, index) => ({
        id: index + 1,
        content: `Post ${index + 1}`,
    }));
};

const ComplexList = () => {
    const [posts, setPosts] = useState(mockGetPosts(100)); // 使用 state 存储 posts
    const itemRefs = useRef([]); // 创建一个数组来存储每个项的 ref
    // 动态计算每个项的高度（固定高度示例）
    const getItemSize = () => 100;

    return (
        <div className="post-list">
            <List
                height={500} // 设置列表的高度
                itemCount={posts.length}
                itemSize={getItemSize} // 使用动态高度的函数
            >
                {/* {renderRow} */}
                {({ index, style }) => (
                    <Item
                        index={index}
                        style={style}
                        posts={posts}
                        itemRefs={itemRefs}
                    />
                )}
            </List>
        </div>
    );
};

const Item = ({ index, style, posts, itemRefs }) => {
    const post = posts[index];
    const itemRef = useRef(null); // 通过 index 创建每个项的 ref

    // 确保每个 ref 被存储到 itemRefs 数组中
    useEffect(() => {
        itemRefs.current[index] = itemRef.current;
    }, [index]);


    const onIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 获取目标元素的指定 id 的子元素
                const targetElement = entry.target;

                // 假设我们想获取 id 为 "aaa" 的子元素
                const aaa = targetElement.querySelector('#aaa');
                // 检查是否找到了指定的子元素
                if (aaa) {
                    // 为指定的子元素添加动画类
                    aaa.style.animationDuration = `${1}s`;
                    aaa.classList.add('animate__fadeInRight');
                    aaa.classList.add('animate__animated');
                    aaa.classList.add(`animation-delay${(index * 0.2 + 0.5).toFixed(1)}s`);

                } else {
                    console.log('未找到指定的子元素');
                }

                // 假设我们想获取 id 为 "aaa" 的子元素
                const bbb = targetElement.querySelector('#bbb');
                // 检查是否找到了指定的子元素
                if (bbb) {
                    // 为指定的子元素添加动画类
                    bbb.style.animationDuration = `${1}s`;
                    bbb.classList.add('animate__fadeInLeft');
                    bbb.classList.add('animate__animated');
                    bbb.classList.add(`animation-delay${(index * 0.2 + 0.5).toFixed(1)}s`);


                } else {
                    console.log('未找到指定的子元素');
                }


                // 你还可以为父元素本身或者其他子元素添加动画类
                targetElement.classList.add('animate__fadeInUp');
                targetElement.classList.add('animate__animated');

                targetElement.style.animationDuration = `${1}s`;
                // animate__delay-${(index * 0.2 + 0.5).toFixed(1)}s
                targetElement.classList.add(`animate__delay-${(index * 0.2 + 0.5).toFixed(1)}s`);


            }
        });
    };


    // 在组件挂载时初始化 IntersectionObserver
    useEffect(() => {
        const currentRef = itemRef.current;

        if (currentRef) {
            const observer = new IntersectionObserver(onIntersection, {
                rootMargin: '0px',
                threshold: 0.2,
            });

            observer.observe(currentRef); // 开始观察当前项

            // 清理函数：在组件卸载时解除观察
            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef); // 解除观察
                }
            };
        }
    }, [post.id]); // 每次 `post.id` 更新时重新设置观察器

    return (
        <div
            ref={itemRef} // 绑定 ref 到该列表项
            style={style} // 必须传递 style 来正确渲染 react-window 列表项
            className="post"
            data-id={post.id} // 给每个列表项一个唯一的 id 用于 IntersectionObserver
            data-wow-delay={`${index * 0.2}s`}  // 设置每个项的延迟时间
        >
            <div className="post-content">
                <div id='aaa'>
                    {post.id}
                </div>
                <div id='bbb'>
                    {post.content}
                </div>
            </div>
        </div>
    );
}
export default ComplexList;
